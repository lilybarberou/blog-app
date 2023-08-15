import axios from 'axios';
import FileRender from '@components/FileRender';
import { File } from '@contexts/types';
import { GetStaticProps } from 'next';

const Post = (props: { file: File }) => {
    const { file } = props;
    return <FileRender file={file} folder='posts' />;
};

export default Post;

export async function getStaticPaths() {
    const { data } = await axios.get('files/paths', { params: { folder: 'posts' } });
    const paths = data.data.map((slug: string) => ({ params: { slug } }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    if (!ctx.params) return { notFound: true };

    let file = {};
    const params = {
        folder: 'posts',
    };

    const { data } = await axios.get(`files/content/${ctx.params.slug}`, { params });
    file = { ...data.data };

    return {
        props: {
            file,
        },
        revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME),
    };
};
