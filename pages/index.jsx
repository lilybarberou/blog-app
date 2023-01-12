import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data } = await axios.get('posts');
                setPosts(data);
            } catch (err) {
                console.log(err);
            }
        };

        getPosts();
    }, []);

    return Object.values(posts).length ? (
        <S.Container>
            {Object.values(posts).map((post) => (
                <S.Post key={post._id} href={`posts/${post._id}`}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </S.Post>
            ))}
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
    gap: 10px;
    padding: 10px;
    padding: 10px;
`;

S.Post = styled(Link)`
    background: #2e2e6f;
    padding: 10px;
    border-radius: 5px;
    color: white;
`;
