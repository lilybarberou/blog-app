import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '../../components/PostCard';

const Late = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const params = {
                limit: 20
            }

            const { data } = await axios.get('posts', {params});

            if (data.success) {
                setPosts(data.data);
            }
        };

        getPosts();
    }, []);

    return posts ? (
        <S.Container>
                <h1>Les late.</h1>
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

export default Late;

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