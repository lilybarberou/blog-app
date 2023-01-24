import axios from 'axios';
import Head from 'next/head';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { getFormData } from '../contexts/Utils';

const Home = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = getFormData('#form');
        const { data: res } = await axios.post('files', { ...data, folder: 'posts' });

        toast(res.message, { type: res.success ? 'success' : 'error' });
    };

    return (
        <S.Container id='form'>
            <Head>
                <title>Créer un post</title>
            </Head>
            <h1>Créer un post</h1>
            <S.InputContainer>
                <label>Slug (mon-titre)</label>
                <S.InputText type='text' name='slug' />
            </S.InputContainer>
            <S.InputContainer>
                <label>Contenu</label>
                <S.Textarea name='code' />
            </S.InputContainer>
            {/* <S.InputContainer>
                <label>Catégories</label>
                <S.InputText type='text' name='categories' />
            </S.InputContainer> */}
            <S.InputContainer>
                <label>Mot de passe</label>
                <S.InputText type='password' name='password' />
            </S.InputContainer>
            <S.InputSubmit onClick={handleSubmit} type='submit' value='Créer' />
        </S.Container>
    );
};

export default Home;

const S = {};
S.Container = styled.form`
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    width: 400px;
    gap: 10px;
    padding: 15px;
    background: #2e2e6f;
    border-radius: 5px;

    & h1 {
        color: white;
    }
    & input,
    & textarea {
        font-family: 'Poppins', sans-serif;
    }
`;

S.InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    & > label {
        color: white;
        font-size: 14px;
        margin-bottom: 5px;
    }
`;

S.Textarea = styled.textarea`
    min-height: ${({ height }) => (height ? height : '120px')};
    padding: 8px 10px;
    max-width: 380px;
    min-width: 380px;
`;

S.InputText = styled.input`
    border: none;
    padding: 8px 10px;
    font-size: 15px;
`;

S.InputSubmit = styled.input`
    border: none;
    background: #7a7acb;
    border-radius: 5px;
    color: white;
    padding: 8px 15px;
    min-width: 100px;
    margin-left: auto;
    margin-top: 10px;
    cursor: pointer;
    font-weight: bold;
`;
