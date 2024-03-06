
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Assuming an association with a User model for the author
    // You may need to adjust the ref property based on your User model name.
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;
