import { File } from '@contexts/types';
import CreateFile from '@views/CreateFile';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const EditFile = (props: { file: File }) => {
    const { file } = props;

    return (
        <>
            <Head>
                <title>Modifier un post</title>
            </Head>
            <CreateFile edit={true} data={file} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!ctx.params) return { notFound: true };

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
};

export default EditFile;
