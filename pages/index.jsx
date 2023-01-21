import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import categories from '../contexts/categories.json';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const { data } = await axios.get('posts');

            if (data.success) {
                setPosts(data.data);
            }
        };

        getPosts();
    }, []);

    return posts ? (
        <S.Container>
            <S.LeftContent>
                <h2>Les late.</h2>
                <S.Posts>
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </S.Posts>
                <h2>Les famous.</h2>
                <S.Posts>
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </S.Posts>
            </S.LeftContent>
            <S.RightContent>
                <h2>Les catégories.</h2>
                <S.Categories>
                    {Object.keys(categories).map((cat) => (
                        <Link key={cat} href={`posts/category/${cat.toLowerCase()}`}>
                            {cat}
                        </Link>
                    ))}
                </S.Categories>
            </S.RightContent>
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Home;

const S = {};
S.Container = styled.div`
    display: flex;

    & h2 {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 30px;
        font-size: 20px;
        white-space: nowrap;
    }
`;

S.LeftContent = styled.div`
    display: flex;
    flex-direction: column;
`;

S.RightContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
`;

S.Posts = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 100px;
`;

S.Categories = styled.div`
    display: flex;
    flex-direction: column;
    border: ${({ theme }) => theme.border};
    padding: 15px;
    align-items: center;
    gap: 10px;

    & > a {
        position: relative;
        padding: 2px 10px;

        &:hover::after {
            width: 100%;
        }
        &::after {
            transition: 0.3s;
            width: 0;
            background: ${({ theme }) => theme.primary};
            height: 100%;
            content: '';
            position: absolute;
            left: 0;
            z-index: -1;
        }
    }
`;
