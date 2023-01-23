import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { getMDXComponent } from 'mdx-bundler/client';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../components/Header';
import Button from '../../components/Button';
import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import Head from 'next/head';

const Post = () => {
    const router = useRouter();
    const [post, setPost] = useState({});

    // reset state when pathname changes
    useEffect(() => {
        setPost([]);
    }, [router.query]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`posts/${router.query.slug}`);
            if (data) setPost(data.data);
        };

        if (router.isReady) getData();
    }, [router]);

    const PostContent = useMemo(() => {
        if (post.code) return getMDXComponent(post.code);
        return <div></div>;
    }, [post.code]);

    return Object.keys(post).length ? (
        <S.Container>
            <Head>
                <title>{post.data.title}</title>
            </Head>
            {Boolean(Object.values(post.data).length) && <Header data={post.data} />}
            <S.Content>
                <PostContent components={{ Button, CodeBlock, Callout }} />
            </S.Content>
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Post;

const S = {};
S.Container = styled.article`
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding: 10px;
    max-width: 800px;
    margin-bottom: 80px;
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
`;
