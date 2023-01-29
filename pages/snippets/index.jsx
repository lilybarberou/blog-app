import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import SnippetCard from '@components/SnippetCard';

const Snippets = ({ snippets }) => {
    return (
        <S.Container>
            <Head>
                <link rel='canonical' href='https://blog.lilybarberou.fr/snippets' />
                <meta property='og:title' content='Les snippets | Lily Dev' />
                <meta property='og:url' content='blog.lilybarberou.fr/snippets' />
                <title>Les snippets | Lily Dev</title>
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

export async function getServerSideProps() {
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

S.Snippets = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
