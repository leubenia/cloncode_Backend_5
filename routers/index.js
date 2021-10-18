const express = require('express');
const router = express.Router();


const postRouter = require('./post');
const userRouter = require('./user');
const likesRouter = require('./likes');
const commRouter = require('./comment');
app.use('/post', [ postRouter ]); // postRouter를 api 하위부분에서 쓰겠다 !
app.use('/', [ userRouter ]);
app.use('/comment', [ commRouter ]);
app.use('/like', [ likesRouter ]);



module.exports = router;