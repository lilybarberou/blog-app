import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import styled from 'styled-components';
import SnippetCard from '@components/SnippetCard';

const Snippets = () => {
    const [snippets, setSnippets] = useState([]);
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
                setSnippets(data.data);
            }
        };

        firstRender.current && getSnippets();
    }, []);

    return snippets.length ? (
        <S.Container>
            <Head>
                <title>Les snippets | Lily Dev</title>
            </Head>
            <h1>Les snippets.</h1>
            <S.Snippets>
                {snippets.map((snippet) => (
                    <SnippetCard key={snippet.slug} snippet={snippet} />
                ))}
            </S.Snippets>
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

S.Snippets = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
