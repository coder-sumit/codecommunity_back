const {registerUser, loginUser, me, profile, toggleFollow, toggleBlock, blockList, followList, updateProfile, updateAvatar} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const sameAuth = require("../middlewares/sameUserAuth");
const multer = require("multer");

// const upload = multer({dest: `${__dirname}/../uploads`});

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../uploads`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `avatar-${Date.now()}.${ext}`);
    },
});

let acceptExt = ['png', 'jpg', 'svg', 'jpeg', 'PNG', 'JPG', 'SVG', 'JPEG'];

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (acceptExt.indexOf(file.mimetype.split("/")[1]) != -1) {
      cb(null, true);
    } else {
      cb(new Error("please upload png, jpg, jpeg, svg files"), false);
    }
};


//Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",auth, me);
router.put("/toggleFollow/:user", auth, toggleFollow);
router.put("/toggleBlock/:user", auth, toggleBlock);
router.get("/blockList", auth, blockList);
router.get("/followList/:id", auth, followList);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateAvatar/:id",auth,sameAuth,  upload.single("avatar"), updateAvatar);

router.get("/:id",auth, profile);

module.exports = router;