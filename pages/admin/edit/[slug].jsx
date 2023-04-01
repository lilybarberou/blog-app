import CreateFile from '@views/CreateFile';
import axios from 'axios';
import Head from 'next/head';

const EditFile = ({ file }) => {
    return (
        <>
            <Head>
                <title>Modifier un post</title>
            </Head>
            <CreateFile edit={true} data={file} />
        </>
    );
};

export async function getServerSideProps(ctx) {
    let file = {};

    const params = {
        folder: 'posts',
        originalFile: true,
    };

    const { data } = await axios.get(`files/content/${ctx.params.slug}`, { params });
    file = { ...data.data };

    return {
        props: {
            file,
        },
    };
}

export default EditFile;
