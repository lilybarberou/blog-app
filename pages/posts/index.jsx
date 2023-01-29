import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import PostCard from '@components/PostCard';

const Posts = ({ posts }) => {
    return (
        <S.Container>
            <Head>
                <link rel='canonical' href='https://blog.lilybarberou.fr/posts' />
                <meta property='og:title' content='Les posts | Lily Dev' />
                <meta property='og:url' content='blog.lilybarberou.fr/posts' />
                <title>Les posts | Lily Dev</title>
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

export async function getServerSideProps() {
    let posts = [];

    const params = {
        limit: 20,
        folder: 'posts',
    };

    const { data } = await axios.get('files', { params });

    if (data.success) posts = data.data;

    return {
        props: {
            posts,
        },
    };
}

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;

    & h1 {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 30px;
        font-size: 25px;
    }
`;

S.Posts = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
