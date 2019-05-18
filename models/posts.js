const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create PostSchema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  photo: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  status: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: {
    type: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Post Model
const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
