import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import PostCard from '@components/PostCard';
import { FileMeta } from '@contexts/types';

const Posts = (props: { posts: FileMeta[] }) => {
    const { posts } = props;

    return (
        <S.Container>
            <Head>
                <link rel='canonical' href='https://lilyscript.fr/posts' />
                <meta property='og:title' content='Les posts | LilyScript' />
                <meta property='og:url' content='https://lilyscript.fr/posts' />
                <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SCREENSHOT_LINK}-posts.png`} />
                <meta
                    property='og:description'
                    content="Découvrez les derniers posts de Lily. Chaque nouveau post est une occasion d'apprendre et de devenir un développeur encore plus badass."
                />
                <meta
                    name='description'
                    content="Découvrez les derniers posts de Lily. Chaque nouveau post est une occasion d'apprendre et de devenir un développeur encore plus badass."
                />
                <title>Les posts | LilyScript</title>
            </Head>
            <h1>Les posts.</h1>
            <S.Posts>
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </S.Posts>
        </S.Container>
    );
};

export default Posts;

export async function getStaticProps() {
    let posts = [];
    const params = {
        limit: 20,
        folder: 'posts',
    };

    const { data } = await axios.get('files', { params });

    if (data.success) posts = data.data;

    return {
        props: { posts },
        revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME),
    };
}

const S: any = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 30px;
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
    flex-wrap: wrap;
`;
