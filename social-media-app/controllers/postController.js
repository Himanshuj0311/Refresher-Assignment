const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

// Create Post
exports.createPost = async (req, res) => {
  const { title, body, device } = req.body;
  try {
    const post = new Post({ title, body, device, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Posts
exports.getPosts = async (req, res) => {
  const { device } = req.query;
  try {
    const filter = device ? { device: { $in: device.split(',') } } : {};
    const posts = await Post.find(filter).populate('user', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body, device } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, body, device },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
