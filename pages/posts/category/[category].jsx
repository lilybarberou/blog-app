import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '../../../components/PostCard';
import Head from 'next/head';
import categories from '../../../contexts/categories.json';

const Home = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const loading = useRef(true);

    // reset state when pathname changes
    useEffect(() => {
        setPosts([]);
    }, [router.query]);

    useEffect(() => {
        const getPosts = async () => {
            const params = {
                category: router.query.category,
            };

            const { data } = await axios.get('posts', { params });
            data.success && setPosts(data.data);
            loading.current = false;
        };

        if (router.isReady) getPosts();
    }, [router]);

    return router.isReady ? (
        <S.Container>
            <Head>
                <title>{categories[router.query.category.toUpperCase()].name} | Lily Dev</title>
            </Head>
            <h1>{categories[router.query.category.toUpperCase()].name}.</h1>
            {loading.current ? (
                <span>Loading...</span>
            ) : posts.length ? (
                <S.Posts>
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </S.Posts>
            ) : (
                <span>Aucun post pour cette catégorie</span>
            )}
        </S.Container>
    ) : (
        <p>Loading...</p>
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
`;
