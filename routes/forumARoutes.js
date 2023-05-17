const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("multer");
const {postForumA, editForumA, deleteForumA} = require("../controllers/forumAController");

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../images`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `forum-a-${Date.now()}.${ext}`);
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


router.post("/postForumA", auth, upload.single('img'), postForumA);
router.put("/editForumA", auth, upload.single('img'), editForumA);
router.delete("/deleteForumA/:id", auth, deleteForumA);


module.exports = router;
