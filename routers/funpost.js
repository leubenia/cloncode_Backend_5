const { sequelize, Sequelize } = require('../models');

async function commentget(num) {
    const post = 'select comments.comment, users.userName, comments.commentId FROM comments inner JOIN posts ON comments.postId = posts.postId inner JOIN users ON comments.userId = users.userId WHERE comments.postId = :postId;';
    const comments = sequelize.query(post, {
        replacements: { 
            postId : num
        },
            type: sequelize.QueryTypes.SELECT
        }
        );
    return comments;
}

async function likeget(num) {
    const post = 'select * from likes where postId = :postId;';
    const comments = await sequelize.query(post, {
        replacements: { 
            postId : num
        },
            type: sequelize.QueryTypes.SELECT
        }
        );
    return comments;
}



module.exports = { commentget , likeget };
