import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import PostCard from '@components/PostCard';
import categories from '@contexts/categories.json';

const Category = ({ posts, category }) => {
    const categoryName = categories[category?.toUpperCase()]?.name;

    return (
        <S.Container>
            <Head>
                <link rel='canonical' href={`https://blog.lilybarberou.fr/category/${category}`} />
                <meta property='og:title' content={`${categoryName} | Lily Dev`} />
                <meta property='og:url' content={`blog.lilybarberou.fr/category/${category}`} />
                <title>{categoryName} | Lily Dev</title>
            </Head>
            <h1>{categoryName}.</h1>
            {posts.length ? (
                <S.Posts>
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </S.Posts>
            ) : (
                <span>Aucun post pour cette catégorie</span>
            )}
        </S.Container>
    );
};

export default Category;

export async function getStaticPaths() {
    const paths = Object.keys(categories).map((cat) => ({ params: { category: cat.toLowerCase() } }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(ctx) {
    let posts,
        category = ctx.params.category;

    const params = {
        category,
        folder: 'posts',
    };

    const { data } = await axios.get('files', { params });
    posts = data.data || [];

    return {
        props: {
            posts,
            category,
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
