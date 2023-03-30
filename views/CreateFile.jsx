import { forwardRef, useImperativeHandle, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { SandpackCodeEditor, SandpackProvider, useActiveCode } from '@codesandbox/sandpack-react';
import { Button, InputContainer } from '@components/StyledComponents';
import { getFormData } from '@contexts/Utils';

const CreateFile = (props) => {
    const { edit = false, data = {} } = props;
    const playgroundRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = getFormData('#form');
        const code = playgroundRef.current.getCode();

        let res;
        if (edit) res = await axios.put('files', { ...data, code, folder: 'posts' });
        else res = await axios.post('files', { ...data, code, folder: 'posts' });

        toast(res.data.message, { type: res.data.success ? 'success' : 'error' });
    };

    const files = {
        '/index.js': {
            code: edit
                ? data.originalFile
                : `---
title:
description:
categories: ['REACT']
---`,
        },
    };

    return (
        <S.Container id='form' onSubmit={handleSubmit}>
            <h1>{edit ? 'Modifier' : 'Créer'} un post</h1>
            <InputContainer>
                <label>Slug (mon-titre)*</label>
                <input type='text' name='slug' defaultValue={data?.meta?.slug} />
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

export default CreateFile;

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
