import { useMemo } from 'react';
import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import styled, { css } from 'styled-components';
import Header from '@components/Header';
import CodeBlock from '@components/CodeBlock';
import Callout from '@components/Callout';
import TableOfContents from './TableOfContent';
import RelatedArticles from './RelatedArticles';

const FileRender = (props) => {
    const { file = {}, folder } = props;

    const FileContent = useMemo(() => {
        if (file.code) return getMDXComponent(file.code);
        return <div></div>;
    }, [file.code]);

    return (
        <S.Wrapper>
            <S.Container $hasTableOfContents={Boolean(file.meta?.tableOfContents)}>
                <Head>
                    <link rel='canonical' href={`https://lilyscript.fr/${folder}/${file.meta?.slug}`} />
                    <meta property='og:title' content={file.meta?.title} />
                    <meta property='og:url' content={`https://lilyscript.fr/${folder}/${file.meta?.slug}`} />
                    <meta property='og:description' content={file.meta?.description} />
                    <meta name='description' content={file.meta?.description} />
                    <title>{file.meta?.title}</title>
                </Head>
                {file.code ? (
                    <>
                        {file.meta && <Header data={file.meta} />}
                        {file.code && (
                            <S.Content>
                                <FileContent components={{ CodeBlock, Callout, RelatedArticles }} />
                            </S.Content>
                        )}
                    </>
                ) : (
                    <span>Ce contenu n&apos;existe pas</span>
                )}
            </S.Container>
            {file.meta?.tableOfContents && <TableOfContents data={file.meta.tableOfContents} />}
        </S.Wrapper>
    );
};

export default FileRender;

const S = {};
S.Wrapper = styled.div`
    display: flex;
    gap: 50px;

    @media (max-width: 1100px) {
        padding: 0;
        display: block;
    }
`;

S.Container = styled.article`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 800px;
    margin-bottom: 80px;

    ${({ $hasTableOfContents }) =>
        !$hasTableOfContents &&
        css`
            margin: auto;
            padding: 10px;
        `};

    @media (max-width: 1100px) {
        padding: 0;
    }
`;

// MARKDOWN STYLE
S.Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    a {
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-color: ${({ theme }) => theme.primary};
    }

    p,
    ul,
    ol,
    u {
        font-family: 'DM Sans', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.5;
        letter-spacing: 0.4px;
        color: hsl(0, 0%, 82.5%);
    }

    h2 {
        color: ${({ theme }) => theme.primary};
        font-size: 30px;
        margin: 50px 0 15px 0;
    }

    h3 {
        color: #fff;
        font-size: 24px;
        margin: 25px 0 10px 0;
    }

    code {
        padding: 2px 5px;
        /* background: #393939; */
        background: #474753;
        border-radius: 5px;
        color: #fff;
        width: fit-content;
    }

    ul {
        margin-left: 15px;
    }

    ol {
        margin-left: 30px;
    }

    blockquote {
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

    u {
        text-underline-offset: 5px;
    }

    .red {
        color: #d85352;
    }
    .orange {
        color: #ffa446;
    }
    .yellow {
        color: #ffcb46;
    }

    @media (max-width: 1100px) {
        padding: 0;

        p,
        ul,
        ol,
        u {
            font-size: 15px;
        }

        & h2 {
            font-size: 23px;
        }
        & h3 {
            font-size: 19px;
        }
    }
`;
