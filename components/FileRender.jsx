import { useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import styled, { css } from 'styled-components';
import Header from '@components/Header';
import CodeBlock from '@components/CodeBlock';
import Callout from '@components/Callout';
import TableOfContents from './TableOfContent';
import RelatedArticles from './RelatedArticles';
import axios from 'axios';

const FileRender = (props) => {
    const { file = {}, folder } = props;
    const [hasLiked, setHasLiked] = useState(false);
    const [nbLikes, setNbLikes] = useState(file.meta?.likes);

    // check in localstorage if user has already liked the file
    useEffect(() => {
        const likedArr = localStorage.getItem('liked') ? JSON.parse(localStorage.getItem('liked')) : [];
        setHasLiked(likedArr.includes(file.meta?.slug));
    }, [file.meta?.slug]);

    const FileContent = useMemo(() => {
        if (file.code) return getMDXComponent(file.code);
        return <div></div>;
    }, [file.code]);

    // add like to file
    const addLike = async () => {
        // add like in localstorage
        const liked = localStorage.getItem('liked') ? JSON.parse(localStorage.getItem('liked')) : [];
        liked.push(file.meta?.slug);
        localStorage.setItem('liked', JSON.stringify(liked));

        // add like in server file
        axios.post('files/like', { slug: file.meta?.slug });

        // update states
        setHasLiked(true);
        setNbLikes(nbLikes + 1);
    };

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
            {file.meta?.tableOfContents && (
                <S.RightContainer>
                    <TableOfContents data={file.meta.tableOfContents} />
                    <S.Like onClick={hasLiked ? undefined : addLike} $active={hasLiked}>
                        {nbLikes}
                        <svg width='24px' height='24px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z'
                                strokeWidth='1.5'
                                strokeLinejoin='round'
                            ></path>
                        </svg>
                    </S.Like>
                </S.RightContainer>
            )}
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

S.RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 100px;
    height: fit-content;
`;

S.Like = styled.p`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: auto;
    cursor: pointer;

    svg {
        fill: ${({ $active, theme }) => ($active ? theme.primary : 'none')};
        stroke: ${({ $active, theme }) => ($active ? theme.primary : '#fff')};
        transition: 0.2s;
    }

    &:hover {
        svg {
            transform: scale(1.2);
        }
    }

    ${({ $active }) =>
        $active &&
        css`
            animation: like 0.2s ease-in-out;

            @keyframes like {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }
        `};
`;
