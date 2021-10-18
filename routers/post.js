const express = require('express');
const router = express.Router();
const { Posts, sequelize, Sequelize } = require('../models');
const authMiddleware = require('../middlewares/middels');
const multer = require('multer');
const multerS3 = require('multer-s3'); 
const AWS = require('aws-sdk'); 
const path = require('path'); 
require('date-utils');

AWS.config.update({
    accessKeyId: "AKIA5VORDKNGW3D3IAPE",
    secretAccessKey: "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",
    region: 'ap-northeast-2',
  });

// 이미지 업로드
const upload = multer({
storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'dodoimglist', 
    acl: 'public-read-write',
    key(req, file, cb) {
        cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
}),
limits: { fileSize: 5 * 1024 * 1024 }, 
});


  
// 게시글 등록
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
      try {
        const { userId } = res.locals.user; 
        const { content } = req.body;
        const postDate = new Date();
        let insertDt = postDate.toFormat('YYYY-MM-DD HH24:MI:SS')
        if (req.file) {
          const originalUrl = req.file.location; 
        //   const resizeUrl = originalUrl.replace(/\/original\//, '/thumb/');
          await Posts.create({ userId, content, image: originalUrl, insertDt });
          res.json({ originalUrl }); //resizeUrl 구현은 나중에
        } else {
          res.status(400).send({ errorMessage: '이미지파일이 없습니다.' });
        }
      } catch (error) {
        res.status(401).send({ errorMessage: '게시글 작성에 실패하였습니다.' });
      }
    }
);
  
// 게시글 수정
router.put('/:postId', authMiddleware, upload.single('image'), async (req, res) => {
    try {
    const s3 = new AWS.S3(); 
    const postId = req.params.postId;
    const { userId } = res.locals.user; 
    const { content } = req.body;
    if (req.file) {
        const postInfo = await Posts.findOne({ where: { postId, userId } });
        if (postInfo) {
        const beforeImage = postInfo.image.split('/')[4];

        s3.deleteObject({
            Bucket: 'dodoimglist',
            Key: `original/${beforeImage}`,
            },
            (err, data) => {
            if (err) { throw err; }
            }
        );
        s3.deleteObject({
            Bucket: 'dodoimglist',
            Key: `thumb/${beforeImage}`,
            },
            (err, data) => {
            if (err) { throw err; }
            }
        );

        const originalUrl = req.file.location; 

        await Posts.update(
            {
            content: content,
            image: originalUrl, 
            },
            { where: { postId: postId, userId: userId }, }
        );
        res.send({ result: '게시글을 수정하였습니다.' });
        } else {
        res.status(401).send({ result: '게시글 수정 실패 되었습니다.' });
        }
    } else {
        const postInfo = await Posts.findOne({ where: { postId, userId } });
        if (postInfo) {
        await Posts.update(
            {
            content: content,
            },
            { where: { postId: postId, userId: userId }, }
        );
        res.send({ result: '게시글을 수정하였습니다.' });
        } else {
        res
            .status(401)
            .send({ errorMessage: '이미지가 없고 해당게시글도 없습니다..' });
        }
    }
    } catch (error) {
    res.status(400).send({
        errorMessage: '게시글 수정에 실패했습니다.',
    });
    }
}
);

// 게시글 삭제 (need to change update to delete)
router.delete('/:postId',authMiddleware, async (req, res) => {
    try {
      const postId = req.params.postId;
      const { userId } = res.locals.user; 
      const postInfo = await Posts.findOne({ where: { postId, userId } });


    // 삭제기능구현(need to put delete instead of updtae)
    //   if (postInfo) {
    //     await Posts.update(
    //       { postDelType: 1, },
    //       { where: { postId: postInfo.postId, userId: userId }, } 
    //     );
    //     res.send({ result: '게시글이 삭제되었습니다!' });
    //   } else {
    //     res.status(401).send({
    //       errorMessage: '삭제할수 없는 게시물입니다!',
    //     });
    //   }
    } catch (error) {
      res.status(400).send({
        errorMessage: '게시글 삭제에 실패했습니다!',
      });
    }
  });