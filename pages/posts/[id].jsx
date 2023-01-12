import axios from 'axios';
import styled from 'styled-components';
import { bundleMDX } from 'mdx-bundler';
import PostLayout from '../../components/PostLayout';

const Post = ({ code, data }) => {
    return code ? (
        <S.Container>
            <PostLayout code={code} data={data} />
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Post;

export async function getStaticProps(context) {
    try {
        const id = context.params.id;
        const { data } = await axios.get(`posts/${id}`);
        const result = await bundleMDX({
            source: data.content,
            cwd: process.cwd(),
        });

        return {
            props: {
                code: result.code,
                data,
            },
        };
    } catch (err) {
        console.log(err);
        return { props: {} };
    }
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
