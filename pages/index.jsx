import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';

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

    const categories = {
        HTML: '#a4352e',
        CSS: '#2876AF',
        JS: '#c2cd4f',
        REACT: '',
        NEXTJS: '',
        NODEJS: '',
    };

    return posts ? (
        <S.Container>
            <S.LeftContent>
                <h2>Les late.</h2>
                <S.Posts>
                    {posts.map((post) => (
                        <S.Post key={post.slug} href={`posts/${post.slug}`}>
                            <div>
                                <S.PostCategories>
                                    {post.categories.map((cat) => (
                                        <S.PostCategory color={categories[cat]} key={cat}>
                                            {cat}
                                        </S.PostCategory>
                                    ))}
                                </S.PostCategories>
                                <span className='date'>{post.date}</span>
                                <span className='title'>{post.title}</span>
                            </div>
                            <div>
                                <p>{post.description}</p>
                                <span className='more'>Lire la suite -></span>
                            </div>
                        </S.Post>
                    ))}
                </S.Posts>
                <h2>Les famous.</h2>
                <S.Posts>
                    {posts.map((post) => (
                        <S.Post key={post.slug} href={`posts/${post.slug}`}>
                            <div>
                                <S.PostCategories>
                                    {post.categories.map((cat) => (
                                        <S.PostCategory color={categories[cat]} key={cat}>
                                            {cat}
                                        </S.PostCategory>
                                    ))}
                                </S.PostCategories>
                                <span className='date'>{post.date}</span>
                                <span className='title'>{post.title}</span>
                            </div>
                            <div>
                                <p>{post.description}</p>
                                <span className='more'>Lire la suite -></span>
                            </div>
                        </S.Post>
                    ))}
                </S.Posts>
            </S.LeftContent>
            <S.RightContent>
                <h2>Les catégories.</h2>
                <S.Categories>
                    {Object.keys(categories).map((cat) => (
                        <Link key={cat} href={`posts/`}>
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
`;

S.Posts = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 100px;
`;

S.Post = styled(Link)`
    padding: 15px;
    height: 200px;
    width: 200px;
    border: ${({ theme }) => theme.border};
    overflow: hidden;

    & > div {
        display: flex;
        flex-direction: column;
        transition: 0.3s;
        height: 100%;

        &:first-child {
            margin-bottom: 15px;
        }
    }
    &:hover > div {
        transform: translateY(calc(-100% - 15px));
    }
    & .date {
        font-size: 13px;
        color: #787878;
    }
    & .title {
        margin-top: 20px;
        align-self: center;
        font-size: 20px;
        text-align: center;
    }
    & p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
    }
    & .more {
        align-self: flex-end;
        margin-top: auto;
        font-size: 15px;
        color: ${({ theme }) => theme.primary};
    }
`;

S.PostCategories = styled.div`
    display: flex;
    gap: 10px;
`;

S.PostCategory = styled.span`
    font-size: 15px;
    color: ${({ color }) => color};
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
