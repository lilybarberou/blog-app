import axios from 'axios';
import styled from 'styled-components';
import PostLayout from '../../components/PostLayout';

const Post = ({ success, data: post }) => {
    return post ? (
        <S.Container>
            <PostLayout code={post.code} data={post.data} />
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Post;

export async function getStaticProps(context) {
    const { data } = await axios.get(`posts/${context.params.slug}`);

    return {
        props: data,
    };
}

export const getStaticPaths = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding: 10px;
`;
