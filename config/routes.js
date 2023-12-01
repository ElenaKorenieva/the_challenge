const express = require("express");
const route = express.Router();
const postController = require("../controller/posts");

route.get("/", postController.getHomePage);
route.get("/feed", postController.getAllPosts);
route.post("/feed", postController.addNewPost);
route.get("/feed/:postId", postController.getOnePostPage);
route.post("/feed/:postId/delete-post", postController.deletePost);
route.get("/feed/edit/:postId", postController.updatePost);
route.post("/feed/edit/:postId/update-post", postController.editPost);

module.exports = route;
