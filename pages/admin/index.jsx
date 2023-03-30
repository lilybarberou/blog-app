import { useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, InputContainer } from '@components/StyledComponents';

const Posts = ({ posts, snippets }) => {
    const router = useRouter();
    const data = useRef({ posts, snippets });
    const passwordRef = useRef();
    const init = { open: false, slug: '', folder: '' };
    const [modalData, setModalData] = useState(init);

    const initModal = () => setModalData(init);

    const handleDelete = async (e) => {
        e.preventDefault();

        const { data: res } = await axios.delete('files', { data: { slug: modalData.slug, password: passwordRef.current.value, folder: modalData.folder } });

        toast(res.message, { type: res.success ? 'success' : 'error' });
        if (res.success) {
            if (modalData.folder === 'posts') data.current = { ...data.current, posts: data.current.posts.filter((post) => post.slug !== modalData.slug) };
            if (modalData.folder === 'snippets')
                data.current = { ...data.current, snippets: data.current.snippets.filter((snippet) => snippet.slug !== modalData.slug) };
            initModal();
        }
    };

    const ModalDelete = () => {
        return (
            <>
                <S.Modal onSubmit={handleDelete}>
                    <InputContainer>
                        <label htmlFor='password'>Mot de passe</label>
                        <input ref={passwordRef} type='password' id='password' required={true} />
                    </InputContainer>
                    <Button>Supprimer</Button>
                </S.Modal>
                <S.Background onClick={initModal} />
            </>
        );
    };

    const Item = (props) => {
        return (
            <S.Item>
                <span>{props.title}</span>
                <div>
                    <svg onClick={() => router.push(`/edit/${props.slug}`)} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                        <path d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z' />
                    </svg>
                    <svg
                        onClick={() => setModalData({ open: true, slug: props.slug, folder: props.folder })}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                    >
                        <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
                    </svg>
                </div>
            </S.Item>
        );
    };

    return (
        <S.Container>
            <Head>
                <link rel='canonical' href='https://blog.lilybarberou.fr/admin' />
                <meta property='og:title' content='Admin | LilyScript' />
                <title>Admin | LilyScript</title>
            </Head>
            <S.Posts>
                <h2>Les posts.</h2>
                {data.current.posts.map((post) => (
                    <Item key={post.slug} {...post} folder='posts' />
                ))}
            </S.Posts>
            <S.Posts>
                <h2>Les snippets.</h2>
                {data.current.snippets.map((snippet) => (
                    <Item key={snippet.slug} {...snippet} folder='snippets' />
                ))}
            </S.Posts>
            {modalData.open && <ModalDelete />}
        </S.Container>
    );
};

export default Posts;

export async function getStaticProps() {
    let posts = [],
        snippets = [];

    const { data } = await axios.get('files');

    if (data.success) {
        posts = data.data.posts;
        snippets = data.data.snippets;
    }

    return {
        props: {
            posts,
            snippets,
        },
    };
}

const S = {};
S.Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;

    h2 {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 20px;
        font-size: 25px;
    }

    @media (max-width: 1100px) {
        h1 {
            font-size: 21px;
            margin-bottom: 20px;
        }
    }
`;

S.Posts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

S.Item = styled.div`
    display: grid;
    grid-template-columns: 1fr 50px;
    max-width: 600px;
    padding-bottom: 10px;
    border-bottom: ${({ theme }) => theme.border};

    > div {
        display: flex;
        gap: 15px;

        svg {
            width: 18px;
            height: 18px;
            fill: ${({ theme }) => theme.primary};
            cursor: pointer;
        }
    }
`;

S.Modal = styled.form`
    z-index: 100;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border-radius: 10px;
    background: #1d1e23;
    width: 300px;
    height: 170px;
`;

S.Background = styled.div`
    z-index: 99;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
`;
