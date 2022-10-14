const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  blogImage: [{}],
});

const Blog = mongoose.model("BlogData", BlogSchema);

module.exports = Blog;
