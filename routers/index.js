const express = require('express');
const router = express.Router();

const postRouter = require('./post');
const userRouter = require('./user');
const likesRouter = require('./likes');
const commRouter = require('./comment');
router.use('/', [userRouter]);
router.use('/post', [postRouter]);
router.use('/comment', [commRouter]);
router.use('/like', [likesRouter]);

module.exports = router;
