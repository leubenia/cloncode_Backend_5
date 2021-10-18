const express = require('express');
const router = express.Router();
// const { sequelize } = require('../models');
const midware = require('../middlewares/middles')

const mysql = require('mysql');
const util = require('util');
const sequelize = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
sequelize.query = util.promisify(sequelize.query);


/// 오호호홓 좋아요
router.post("/", midware, async (req, res) => {
  const { postId, like } = req.body; 
  const user = res.locals.user;
  try {
    if(like){
        const likeQuery = [ postId, user.Id ]
        const post = 'INSERT into likes (postId, userId) values(? , ?)';
        sequelize.query(post, likeQuery, (error, results) => {
        if (error) {
              res.status(400).send({        
              errorMessage: error,
              result:'fail'
            });
        } else {
            res.send({results : "success"});
        }
        });
    }else{
        const likeQuery = [user.Id , postId]
        const post = 'DELETE FROM likes WHERE userId = ? and postId = ?;';
        db.query(post, likeQuery, (error, results, fields) => {
          if (error) {
            res.status(400).send({        
              errorMessage: error,
              result:'fail'
            });
          } else {
            res.status(200).send({results : "success"});
          }
        });
    }
  } catch (err) {
    res.status(400).send({ 
      errorMessage: err,
      result:'fail'
    });
  }
});


module.exports = router;