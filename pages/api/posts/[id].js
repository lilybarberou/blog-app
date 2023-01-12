import dbConnect from '../../../lib/dbConnect';
import Post from '../../../lib/models/Post';

export default async function handler(req, res) {
    await dbConnect();

    try {
        const { id } = req.query;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(201).json({ success: false, error: 'Id is not valid' });
        }

        const post = await Post.findById(id);
        if (!Object.values(post).length) return res.status(202).json({ success: false, error: 'Post does not exists' });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error, success: false });
    }
}
