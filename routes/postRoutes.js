const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const sameAuth = require("../middlewares/sameUserAuth");
const multer = require("multer");

const {post, editPost, deletePost, getPosts} = require("../controllers/postController"); 


//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../images`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `post-${Date.now()}.${ext}`);
    },
});

let acceptExt = ['png', 'jpg', 'svg', 'jpeg', 'PNG', 'JPG', 'SVG', 'JPEG'];

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (acceptExt.indexOf(file.mimetype.split("/")[1]) != -1) {
      cb(null, true);
  } else{
      cb(new Error("please upload png, jpg, jpeg, svg files"), false);
    }
};

//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post("/post", auth, upload.single('img'), post);
router.put("/editPost", auth, upload.single('img'), editPost);
router.delete("/deletePost/:id", auth, deletePost);
router.get("/getPosts", auth, getPosts);


module.exports = router;