import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '@components/PostCard';
import { categories } from '@contexts/categories';
import { FileMeta } from '@contexts/types';

const Home = (props: { posts: FileMeta[] }) => {
    const { posts } = props;
    // sort posts by likes
    const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

    return (
        <S.Container>
            <Head>
                <link rel='canonical' href='https://lilyscript.fr/' />
                <meta property='og:title' content='LilyScript | Un blog de dev' />
                <meta property='og:url' content='https://lilyscript.fr/' />
                <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SCREENSHOT_LINK}.png`} />
                <meta
                    property='og:description'
                    content="Le blog de Lily, c'est comme un café (d'idées) sur la programmation - sauf que vous n'aurez pas à payer pour un café décevant."
                />
                <meta
                    name='description'
                    content="Le blog de Lily, c'est comme un café (d'idées) sur la programmation - sauf que vous n'aurez pas à payer pour un café décevant."
                />
                <title>LilyScript | Un blog de dev</title>
            </Head>
            <h1>Installez-vous, et bonne lecture</h1>
            <S.Content>
                <S.LeftContent>
                    <h2>Les late.</h2>
                    <S.Posts>
                        {posts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </S.Posts>
                    <h2>Les famous.</h2>
                    <S.Posts>
                        {sortedPosts.map((post) => (
                            <PostCard key={post.slug} post={post} />
                        ))}
                    </S.Posts>
                </S.LeftContent>
                <S.RightContent>
                    <h2>Les catégories.</h2>
                    <S.Categories>
                        {Object.keys(categories).map((cat) => (
                            <Link key={cat} href={`/posts/category/${cat.toLowerCase()}`}>
                                {cat}
                            </Link>
                        ))}
                    </S.Categories>
                </S.RightContent>
            </S.Content>
        </S.Container>
    );
};

export default Home;

export async function getStaticProps() {
    let posts = [];

    const { data } = await axios.get('files', { params: { folder: 'posts' } });
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
    gap: 40px;

    h1 {
        font-size: 28px;
    }

    h2 {
        color: ${({ theme }) => theme.primary};
        margin-bottom: 30px;
        font-size: 20px;
        white-space: nowrap;
    }

    @media (max-width: 1100px) {
        h1 {
            font-size: 21px;
        }
        h2 {
            font-size: 17px;
            margin-bottom: 20px;
        }
    }
`;

S.Content = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 750px) {
        flex-direction: column;
        gap: 0px;
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

    @media (max-width: 750px) {
        margin-left: unset;
        width: fit-content;
    }
`;

S.Posts = styled.div`
    display: flex;
    flex-wrap: wrap;

    &:nth-child(2) {
        margin-bottom: 70px;
    }

    @media (max-width: 750px) {
        margin-bottom: 50px;

        &:nth-child(2) {
            margin-bottom: 50px;
        }
    }
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
