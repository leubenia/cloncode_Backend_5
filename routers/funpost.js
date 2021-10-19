const { sequelize, Sequelize } = require('../models');

async function commentget(num) {
    const post = 'select * from comments where postId = :postId;';
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
    const comments = sequelize.query(post, {
        replacements: { 
            postId : num
        },
            type: sequelize.QueryTypes.SELECT
        }
        );
    return comments;
}



module.exports = { commentget , likeget };
