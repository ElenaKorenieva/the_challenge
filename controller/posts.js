const post = require("../model/feed");

const getHomePage = (req, res) => {
  res.redirect("/feed");
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await post.find({}).sort({ createdAt: -1 });
    res.render("index", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const addNewPost = async (req, res) => {
  try {
    if (req.body.name.length <= 25 || req.body.message.length <= 40) {
      const postNew = new post(req.body);
      await postNew.save();
      res.redirect("/feed");
    } else {
      const posts = await post.find({}).sort({ createdAt: -1 });
      res.render("index", {
        posts,
        err: "Name or message field length is too long",
      });
    }
  } catch (err) {
    console.error(err);
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
  const { postId } = req.params;
  const singlePost = await post.findById(postId);
  res.render("editPost", { singlePost });
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  const newPost = await post.findByIdAndUpdate(postId, req.body);
  res.redirect(`/feed/${newPost._id}`);
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
