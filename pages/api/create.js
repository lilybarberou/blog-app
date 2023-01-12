import dbConnect from '../../lib/dbConnect';
import Post from '../../lib/models/Post';

export default async function handler(req, res) {
    await dbConnect();

    const { title, description, categories, content, likes, password, published } = req.body;

    if (password === process.env.PASSWORD) {
        const newPost = new Post({
            title,
            description,
            categories,
            content,
            likes,
            published: published || true,
            date: new Date(),
        });

        try {
            const addedPost = await newPost.save();
            res.status(200).json(addedPost);
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    } else res.status(203).end();
}
