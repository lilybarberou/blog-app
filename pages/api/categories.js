import dbConnect from '../../lib/dbConnect';
import Post from '../../lib/models/Post';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const posts = await Post.find();

        let categories = [];

        posts.forEach((post) => {
            post.categories.forEach((category) => {
                !categories.includes(category) && categories.push(category);
            });
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error, success: false });
    }
}
