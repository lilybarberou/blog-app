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
                <link rel='canonical' href={`https://blog.lilybarberou.fr/posts/category/${category}`} />
                <meta property='og:title' content={`${categoryName} | LilyScript`} />
                <meta property='og:url' content={`https://blog.lilybarberou.fr/posts/category/${category}`} />
                <meta
                    property='og:description'
                    content={`Liste des posts ${categoryName}. Chaque nouveau post est une occasion d'apprendre et de devenir un développeur encore plus badass.`}
                />
                <meta
                    name='description'
                    content={`Liste des posts ${categoryName}. Chaque nouveau post est une occasion d'apprendre et de devenir un développeur encore plus badass.`}
                />
                <title>{categoryName} | LilyScript</title>
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
        revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_TIME),
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
