import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import axios from 'axios';
import styled from 'styled-components';
import Header from '@components/Header';
import CodeBlock from '@components/CodeBlock';
import Callout from '@components/Callout';

const FileRender = (props) => {
    const { folder } = props;
    const router = useRouter();
    const [file, setFile] = useState({ loading: true });

    // reset state when pathname changes
    useEffect(() => {
        setFile({ loading: true });
    }, [router.query]);

    useEffect(() => {
        const getData = async () => {
            const params = {
                folder,
            };

            const { data } = await axios.get(`files/${router.query.slug}`, { params });
            setFile({ loading: false, ...data.data });
        };

        if (router.isReady) getData();
    }, [router, folder]);

    const FileContent = useMemo(() => {
        if (file.code) return getMDXComponent(file.code);
        return <div></div>;
    }, [file.code]);

    return router.isReady && !file.loading ? (
        <S.Container>
            <Head>
                <link rel='canonical' href={`https://blog.lilybarberou.fr/${folder}/${router.query.slug}`} />
                <meta property='og:title' content={file.meta?.title} />
                <meta property='og:url' content={`blog.lilybarberou.fr/${folder}/${router.query.slug}`} />
                <title>{file.meta?.title}</title>
            </Head>
            {file.code ? (
                <>
                    {file.meta && <Header data={file.meta} />}
                    {file.code && (
                        <S.Content>
                            <FileContent components={{ CodeBlock, Callout }} />
                        </S.Content>
                    )}
                </>
            ) : (
                <span>Ce contenu n&apos;existe pas</span>
            )}
        </S.Container>
    ) : (
        <span>Loading...</span>
    );
};

export default FileRender;

const S = {};
S.Container = styled.article`
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    max-width: 800px;
    margin-bottom: 80px;

    @media (max-width: 1100px) {
        padding: 0;
    }
`;

// MARKDOWN STYLE
S.Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    & p,
    ul,
    ol {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
    }

    & h2 {
        color: ${({ theme }) => theme.primary};
        font-size: 26px;
        margin: 20px 0 15px 0;
    }

    & h3 {
        color: #fff;
        font-size: 22px;
        margin: 10px 0;
    }

    & code {
        padding: 2px 5px;
        background: #00000039;
        border-radius: 5px;
        color: #fff;
        width: fit-content;
    }

    & ul {
        margin-left: 15px;
    }

    & ol {
        margin-left: 30px;
    }

    & blockquote {
        position: relative;
        padding-left: 15px;
        background: #00000026;
        border-radius: 0 5px 5px 0;
        width: fit-content;
        padding-right: 10px;

        &::before {
            position: absolute;
            left: 0;
            content: '';
            height: 100%;
            width: 5px;
            background: #7b7b7b;
        }
    }

    & u {
        text-underline-offset: 5px;
    }

    & .red {
        color: #d85352;
    }
    & .orange {
        color: #ffa446;
    }
    & .yellow {
        color: #ffcb46;
    }

    @media (max-width: 1100px) {
        padding: 0;

        & h2 {
            font-size: 23px;
        }
        & h3 {
            font-size: 19px;
        }
    }
`;
