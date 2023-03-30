import { forwardRef, useImperativeHandle, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { SandpackCodeEditor, SandpackProvider, useActiveCode } from '@codesandbox/sandpack-react';
import { getFormData } from '@contexts/Utils';
import { Button, InputContainer } from '@components/StyledComponents';

const CreatePost = () => {
    const playgroundRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = getFormData('#form');
        const code = playgroundRef.current.getCode();
        const { data: res } = await axios.post('files', { ...data, code, folder: 'posts' });

        toast(res.message, { type: res.success ? 'success' : 'error' });
    };

    const files = {
        '/index.js': {
            code: `---
title:
description:
categories: ['REACT']
---`,
        },
    };

    return (
        <S.Container id='form' onSubmit={handleSubmit}>
            <Head>
                <title>Créer un post</title>
            </Head>
            <h1>Créer un post</h1>
            <InputContainer>
                <label>Slug (mon-titre)*</label>
                <input type='text' name='slug' />
            </InputContainer>
            <SandpackProvider files={files} theme='dark'>
                <Playground ref={playgroundRef} />
            </SandpackProvider>
            <InputContainer width='200px'>
                <label>Mot de passe*</label>
                <input type='password' name='password' />
            </InputContainer>
            <S.Button>Créer</S.Button>
        </S.Container>
    );
};

export default CreatePost;

const Playground = forwardRef((props, ref) => {
    const { code } = useActiveCode();

    // pass code to parent
    useImperativeHandle(ref, () => ({
        getCode: () => code,
    }));

    return <SandpackCodeEditor />;
});

Playground.displayName = 'Playground';

const S = {};
S.Container = styled.form`
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    gap: 20px;
    border-radius: 5px;

    h1 {
        color: white;
        margin-bottom: 30px;
    }
    input {
        font-family: 'Poppins', sans-serif;
    }

    .sp-stack {
        height: 400px;
    }
`;

S.Button = styled(Button)`
    margin-top: 10px;
    margin-left: auto;
    min-width: 150px;
`;
