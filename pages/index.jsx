import axios from 'axios';
import Link from 'next/link';
import styled from 'styled-components';

const Home = ({ success, data: posts }) => {
    return success ? (
        <S.Container>
            {posts.map((post) => (
                <S.Post key={post.slug} href={`posts/${post.slug}`}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </S.Post>
            ))}
        </S.Container>
    ) : (
        <p>Loading</p>
    );
};

export default Home;

export async function getStaticProps() {
    const { data } = await axios.get('posts');

    return {
        props: data,
    };
}

const S = {};
S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    padding: 10px;
`;

S.Post = styled(Link)`
    background: #2e2e6f;
    padding: 10px;
    border-radius: 5px;
    color: white;
`;
