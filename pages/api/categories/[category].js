import dbConnect from '../../../lib/dbConnect';
import Post from '../../../lib/models/Post';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const { category } = req.query;

        const posts = await Post.find({ categories: category });

        if (posts.length === 0) return res.json({ error: 'This category does not exists!' });

        res.status(200).json({ posts });
    } catch (error) {
        res.status(400).json({ error, success: false });
    }
}
