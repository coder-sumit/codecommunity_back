const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("multer");
const {postForumQ, editForumQ, deleteForumQ} = require("../controllers/forumQController");

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../images`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `forum-q-${Date.now()}.${ext}`);
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


router.post("/postForumQ", auth, upload.single('img'), postForumQ);
router.put("/editForumQ", auth, upload.single('img'), editForumQ);
router.delete("/deleteForumQ/:id", auth, deleteForumQ);


module.exports = router;
