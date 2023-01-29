import axios from 'axios';
import FileRender from '@components/FileRender';

const Snippet = ({ file }) => <FileRender file={file} folder='snippets' />;

export default Snippet;

export async function getServerSideProps(ctx) {
    let file = {};

    const params = {
        folder: 'snippets',
    };

    const { data } = await axios.get(`files/${ctx.params.slug}`, { params });
    file = { ...data.data };

    return {
        props: {
            file,
        },
    };
}
