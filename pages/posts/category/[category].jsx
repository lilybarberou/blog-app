import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '../../../components/PostCard';
import Head from 'next/head';
import categories from '../../../contexts/categories.json';

const Home = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const params = {
                category: router.query.category
            }

            const { data } = await axios.get('posts', {params});
            data.success && setPosts(data.data)
        };

        if (router.isReady) getPosts();
    }, [router]);

    return router.isReady && posts ? (
        <S.Container>
            <Head>
                <title>{categories[router.query.category.toUpperCase()].name} | Lily Dev</title>
            </Head>
                <h1>{categories[router.query.category.toUpperCase()].name}.</h1>
                <S.Posts>
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </S.Posts>
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Home;

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
    margin-bottom: 100px;
`;