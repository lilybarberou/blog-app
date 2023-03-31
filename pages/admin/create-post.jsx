import CreateFile from '@views/CreateFile';
import Head from 'next/head';

const CreatePost = () => {
    return (
        <>
            <Head>
                <title>Créer un post</title>
            </Head>
            <CreateFile />
        </>
    );
};

export default CreatePost;
