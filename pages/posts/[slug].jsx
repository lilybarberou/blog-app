import axios from 'axios';
import FileRender from '@components/FileRender';

const Post = ({ file }) => <FileRender file={file} folder='posts' />;

export default Post;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps(ctx) {
    let file = {};

    const params = {
        folder: 'posts',
    };

    const { data } = await axios.get(`files/${ctx.params.slug}`, { params });
    file = { ...data.data };

    return {
        props: {
            file,
        },
    };
}
