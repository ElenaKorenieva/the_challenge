const post = require("../model/feed");

const getHomePage = (req, res) => {
  res.redirect("/feed");
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await post.find().sort({ createdAt: -1 });
    res.render("index", { posts, err: posts.errors });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const addNewPost = async (req, res) => {
  try {
    const newPost = new post(req.body);
    await newPost.save();
    res.redirect("/");
  } catch (err) {
    const posts = await post.find().sort({ createdAt: -1 });
    res.render("index", { posts, err: err.errors });
  }
};

const getOnePostPage = async (req, res) => {
  const { postId } = req.params;
  const singlePost = await post.findById(postId);
  res.render("updatePage", { singlePost });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  await post.findByIdAndDelete(postId);
  res.redirect("/feed");
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const singlePost = await post.findById(postId);
    res.render("editPost", { singlePost, err: singlePost.errors });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const newPost = await post.findByIdAndUpdate(postId, req.body);
    res.redirect(`/feed/${newPost._id}`);
  } catch (err) {
    const { postId } = req.params;
    const newPost = await post.findByIdAndUpdate(postId, req.body);
    res.render("editPost", { newPost, err: err.errors });
  }
};
module.exports = {
  getHomePage,
  getAllPosts,
  addNewPost,
  getOnePostPage,
  deletePost,
  updatePost,
  editPost,
};
