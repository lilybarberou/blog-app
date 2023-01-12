import { Schema, model, models } from 'mongoose';

const PostSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Object,
        required: false,
    },
    published: {
        type: Boolean,
        required: true,
    },
});

module.exports = models.Post || model('Post', PostSchema);
