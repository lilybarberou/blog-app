import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import PostLayout from '../../components/PostLayout';

const Post = (props) => {
    const router = useRouter();
    const [post, setPost] = useState({});

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`posts/${router.query.slug}`);

            if (data) {
                setPost(data.data);
            }
        };

        if (router.isReady) getData();
    }, [router]);

    return Object.keys(post).length ? (
        <S.Container>
            <PostLayout code={post.code} data={post.data} />
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Post;

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding: 10px;
`;
