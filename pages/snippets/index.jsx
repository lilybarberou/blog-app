import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '@components/PostCard';

const Snippets = () => {
    const [posts, setPosts] = useState([]);
    const firstRender = useRef(true);

    useEffect(() => {
        const getSnippets = async () => {
            firstRender.current = false;

            const params = {
                limit: 20,
                folder: 'snippets',
            };

            const { data } = await axios.get('files', { params });

            if (data.success) {
                setPosts(data.data);
            }
        };

        firstRender.current && getSnippets();
    }, []);

    return posts.length ? (
        <S.Container>
            <Head>
                <title>Les snippets | Lily Dev</title>
            </Head>
            <h1>Les snippets.</h1>
            <S.Posts>
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </S.Posts>
        </S.Container>
    ) : (
        <p>Loading...</p>
    );
};

export default Snippets;

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
