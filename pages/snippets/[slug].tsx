import axios from 'axios';
import FileRender from '@components/FileRender';
import { File } from '@contexts/types';
import { GetStaticProps } from 'next';

const Snippet = (props: { file: File }) => {
    const { file } = props;
    return <FileRender file={file} folder='snippets' />;
};

export default Snippet;

export async function getStaticPaths() {
    const { data } = await axios.get('files/paths', { params: { folder: 'snippets' } });
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
        folder: 'snippets',
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
