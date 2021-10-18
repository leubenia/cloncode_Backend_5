const express = require("express");
const router = express.Router();

// const postRouter = require('./post');
const userRouter = require("./user");
// const likesRouter = require('./likes');
// const commRouter = require('./comment');
// router.use('/post', [ postRouter ]); // postRouter를 api 하위부분에서 쓰겠다 !
router.use("/", [userRouter]);
// router.use('/comment', [ commRouter ]);
// router.use('/like', [ likesRouter ]);

const postRouter = require("./post");
// const userRouter = require('./user');
const likesRouter = require("./likes");
const commRouter = require("./comment");
router.use("/post", [postRouter]);
// router.use('/', [ userRouter ]);
router.use("/comment", [commRouter]);
router.use("/like", [likesRouter]);

module.exports = router;
