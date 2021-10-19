// const express = require('express');
// const router = express.Router();
// const { Posts, sequelize, Sequelize } = require('../models');
// // const authMiddleware = require('../middlewares/middels');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const AWS = require('aws-sdk');
// const path = require('path');
// const { commentget } = require('./comment');
// const { post } = require('.');
// const midware = require('../middlewares/middles');
// require('date-utils');

// AWS.config.update({
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey,
//   region: 'ap-northeast-2',
// });

// // 이미지 업로드
// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: process.env.bucket,
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
//     },
//     acl: 'public-read-write',
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// // 게시물 조회, 좋아요 기능 추가해야 함.
// router.get('/', async (req, res) => {
//   try {
//     const userId_join = `
//       SELECT p.*, u.profile
//       FROM posts AS p
//       JOIN users AS u
//       ON p.userId = u.userId
//       ORDER BY p.postId DESC;`;

//     const posts = await sequelize.query(userId_join, {
//       type: Sequelize.QueryTypes.SELECT,
//     });
//     for (post of posts) {
//       const commentget = commentget(post.postId);
//       post.comment = commentget;
//       post.commentCnt = commentget.length;
//     }
//     res.send({ result: posts });
//   } catch (error) {
//     console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
//     res.status(400).send({
//       errorMessage: '전체 게시글 조회에 실패했습니다.',
//     });
//   }
// });

// // 게시글 등록
// router.post('/', midware, upload.single('image'), async (req, res) => {
//   try {
//     const { user } = res.locals;
//     const { content } = req.body;
//     const postDate = new Date();
//     const insertDt = postDate.toFormat('YYYY-MM-DD HH24:MI:SS');
//     if (req.file) {
//       const originalUrl = req.file.location;
//       //   const resizeUrl = originalUrl.replace(/\/original\//, '/thumb/');
//       const post = await Posts.create({
//         user: user.userId,
//         content,
//         image: originalUrl,
//         insertDt,
//         user: user.userName,
//       });
//       res.send({ post: post, user: user, result: 'success' }); //resizeUrl 구현은 나중에
//     } else {
//       res
//         .status(400)
//         .send({ result: 'fail', errorMessage: '이미지파일이 없습니다.' });
//     }
//   } catch (error) {
//     res
//       .status(401)
//       .send({ result: 'fail', errorMessage: '게시글 작성에 실패하였습니다.' });
//   }
// });

// // 게시글 수정
// router.put('/:postId', midware, upload.single('image'), async (req, res) => {
//   try {
//     const s3 = new AWS.S3();
//     const postId = req.params.postId;
//     const { userId } = res.locals.user;
//     const { content } = req.body;
//     if (req.file) {
//       const postInfo = await Posts.findOne({ where: { postId, userId } });
//       if (postInfo) {
//         const beforeImage = postInfo.image.split('/')[4];

//         s3.deleteObject(
//           {
//             Bucket: process.env.bucket,
//             Key: `original/${beforeImage}`,
//           },
//           (err, data) => {
//             if (err) {
//               throw err;
//             }
//           }
//         );
//         s3.deleteObject(
//           {
//             Bucket: process.env.bucket,
//             Key: `thumb/${beforeImage}`,
//           },
//           (err, data) => {
//             if (err) {
//               throw err;
//             }
//           }
//         );

//         const originalUrl = req.file.location;

//         await Posts.update(
//           {
//             content: content,
//             image: originalUrl,
//           },
//           { where: { postId: postId, userId: userId } }
//         );
//         res.send({ result: '게시글을 수정하였습니다.' });
//       } else {
//         res.status(401).send({ result: '게시글 수정 실패 되었습니다.' });
//       }
//     } else {
//       const postInfo = await Posts.findOne({ where: { postId, userId } });
//       if (postInfo) {
//         await Posts.update(
//           {
//             content: content,
//           },
//           { where: { postId: postId, userId: userId } }
//         );
//         res.send({ result: '게시글을 수정하였습니다.' });
//       } else {
//         res
//           .status(401)
//           .send({ errorMessage: '이미지가 없고 해당게시글도 없습니다..' });
//       }
//     }
//   } catch (error) {
//     res.status(400).send({
//       errorMessage: '게시글 수정에 실패했습니다.',
//     });
//   }
// });

// // 게시글 삭제 (need to change update to delete)
// router.delete('/:postId', midware, async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const { userId } = res.locals.user;
//     const postInfo = await Posts.findOne({ where: { postId, userId } });

//     // 삭제기능구현(need to put delete instead of updtae)
//     //   if (postInfo) {
//     //     await Posts.update(
//     //       { postDelType: 1, },
//     //       { where: { postId: postInfo.postId, userId: userId }, }
//     //     );
//     //     res.send({ result: '게시글이 삭제되었습니다!' });
//     //   } else {
//     //     res.status(401).send({
//     //       errorMessage: '삭제할수 없는 게시물입니다!',
//     //     });
//     //   }
//   } catch (error) {
//     res.status(400).send({
//       errorMessage: '게시글 삭제에 실패했습니다!',
//     });
//   }
// });

// module.exports = router;
