import axios from 'axios';
import FileRender from '@components/FileRender';

const Snippet = ({ file }) => <FileRender file={file} folder='snippets' />;

export default Snippet;

export async function getStaticPaths() {
    const { data } = await axios.get('files/paths', { params: { folder: 'snippets' } });
    const paths = data.data.map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(ctx) {
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
        revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_TIME),
    };
}
