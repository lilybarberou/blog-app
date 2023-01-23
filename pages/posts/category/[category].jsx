import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '../../../components/PostCard';
import categories from '../../../contexts/categories.json';

const Category = () => {
    const router = useRouter();
    const [posts, setPosts] = useState({ loading: true });

    // reset state when pathname changes
    useEffect(() => {
        setPosts({ loading: true });
    }, [router.query]);

    useEffect(() => {
        const getPosts = async () => {
            const params = {
                category: router.query.category,
            };

            const { data } = await axios.get('posts', { params });
            setPosts({ data: data.data || [], loading: false });
        };

        if (router.isReady) getPosts();
    }, [router]);

    return router.isReady && !posts.loading ? (
        <S.Container>
            <Head>
                <title>{categories[router.query.category.toUpperCase()].name} | Lily Dev</title>
            </Head>
            <h1>{categories[router.query.category.toUpperCase()].name}.</h1>
            {posts.data.length ? (
                <S.Posts>
                    {posts.data.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </S.Posts>
            ) : (
                <span>Aucun post pour cette catégorie</span>
            )}
        </S.Container>
    ) : (
        <span>Loading...</span>
    );
};

export default Category;

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
