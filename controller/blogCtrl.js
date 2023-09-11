const Blog = require("../models/blogModel");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require("../utils/validateMongodbid");

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            status: "Success",
            newBlog,
        })
    } catch (error) {
        throw new Error(error);
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBlog = await Blog.findById(id).populate("likes");
        await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            {
                new: true
            }
        )
        res.json(getBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error);
    }
});
const LikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);

    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);

    // find the login user
    const loginUserId = req?.user?._id;

    // Find the index of the comment you want to update based on the liked user
    const commentIndex = blog?.comments.findIndex(comment =>
        comment.liked && comment.liked.toString() === loginUserId.toString()
    );

    if (commentIndex !== -1) {
        // If the comment was found and liked, remove the liked user
        blog.comments[commentIndex].liked = undefined;
        blog.isLiked = false;
    } else {
        // If the comment was not found or was not liked, add the liked user
        blog.comments.push({
            sentBy: loginUserId,
            sentAt: new Date(),
            liked: loginUserId,
        });
        blog.isLiked = true;
    }

    // Save the updated blog
    await blog.save();

    res.json(blog);
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, LikeBlog };
