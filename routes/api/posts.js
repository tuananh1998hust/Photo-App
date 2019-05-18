const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Post Model
const Post = require("../../models/posts");
// Middleware
const auth = require("../../middleware/auth");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("photo");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// @route    POST api/posts
// @desc     Create New Posts
// @access   Private
router.post("/", auth, (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ msg: err });
    } else {
      if (req.file == undefined) {
        return res.json({ msg: ["Error: No File Selected!"] });
      } else {
        const photo = `/uploads/${req.file.filename}`;
        const user = req.user;
        const { name, status, avatar } = req.body;

        const newPost = new Post({
          user,
          photo,
          name,
          status,
          avatar
        });

        newPost.save().then(post => res.json(post));
      }
    }
  });
});

// @route    GET api/posts
// @desc     Get All Posts
// @access   Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route    POST api/posts/:id/cmt
// @desc     Add Comment By Id
// @access   Private
router.post("/:id/cmt", auth, (req, res) => {
  const { text, name } = req.body;
  const user = req.user;

  Post.findById(req.params.id).then(cmt => {
    cmt.comments.push({
      user,
      text,
      name
    });

    cmt.save().then(cmt => res.json(cmt));
  });
});

// @route    GET api/posts/:id
// @desc     Get Posts By Id
// @access   Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then(post => res.json(post));
});

module.exports = router;
