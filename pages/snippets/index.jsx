import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import SnippetCard from '@components/SnippetCard';

const Snippets = ({ snippets }) => {
    return (
        <S.Container>
            <Head>
                <link rel='canonical' href='https://blog.lilybarberou.fr/snippets' />
                <meta property='og:title' content='Les snippets | LilyScript' />
                <meta property='og:url' content='https://blog.lilybarberou.fr/snippets' />
                <meta
                    property='og:description'
                    content="Une liste de snippets, des extraits de code pratiques dont on se sert beaucoup, mais qu'on oublie aussi beaucoup."
                />
                <meta
                    name='description'
                    content="Une liste de snippets, des extraits de code pratiques dont on se sert beaucoup, mais qu'on oublie aussi beaucoup."
                />
                <title>Les snippets | LilyScript</title>
            </Head>
            <h1>Les snippets.</h1>
            <S.Snippets>
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet.slug} snippet={snippet} />
                ))}
            </S.Snippets>
        </S.Container>
    );
};

export default Snippets;

export async function getStaticProps() {
    let snippets = [];

    const params = {
        limit: 20,
        folder: 'snippets',
    };

    const { data } = await axios.get('files', { params });

    if (data.success) snippets = data.data;

    return {
        props: {
            snippets,
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

    @media (max-width: 1100px) {
        h1 {
            font-size: 21px;
            margin-bottom: 20px;
        }
    }
`;

S.Snippets = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
