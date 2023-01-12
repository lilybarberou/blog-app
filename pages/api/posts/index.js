import dbConnect from '../../../lib/dbConnect';
import Post from '../../../lib/models/Post';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const posts = await Post.find({ published: true });

        // convert array to object
        const obj = {};
        posts.forEach((post) => (obj[post._id] = post));

        res.status(200).json(obj);
    } catch (error) {
        res.status(400).json({ error, success: false });
    }
}
