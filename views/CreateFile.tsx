import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { File, PlaygroundRef } from '@contexts/types';
import { getFormData } from '@contexts/Utils';
import { SandpackCodeEditor, SandpackProvider, useActiveCode } from '@codesandbox/sandpack-react';
import { Button, InputContainer } from '@components/StyledComponents';
import Back from '@components/Back';

const CreateFile = (props: { edit?: boolean; data?: File }) => {
    const { edit = false, data } = props;
    const playgroundRef = useRef<PlaygroundRef>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = getFormData('#form');
        const code = playgroundRef.current!.getCode();

        let old_slug;
        if (edit && formData.slug !== data?.meta.slug) old_slug = data?.meta.slug;

        let res;
        if (edit) res = await axios.put('files', { ...formData, code, old_slug, folder: 'posts' });
        else res = await axios.post('files', { ...formData, code, folder: 'posts' });

        toast(res.data.message, { type: res.data.success ? 'success' : 'error' });
        if (res.data.success) router.push('/admin');
    };

    const files = {
        '/index.js': {
            code: edit
                ? data?.originalFile || ''
                : `---
title:
description:
categories: ['REACT']
---`,
        },
    };

    return (
        <S.Container id='form' onSubmit={handleSubmit}>
            <Back url='/admin' />
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
            <S.Button>{edit ? 'Modifier' : 'Créer'}</S.Button>
        </S.Container>
    );
};

export default CreateFile;

const Playground = forwardRef<PlaygroundRef>((props, ref) => {
    const { code } = useActiveCode();

    // pass code to parent
    useImperativeHandle(ref, () => ({
        getCode: () => code,
    }));

    return <SandpackCodeEditor />;
});

Playground.displayName = 'Playground';

const S: any = {};
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
        font-family: var(--font-dm-sans), sans-serif;
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
