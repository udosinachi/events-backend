const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    blogImage: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
