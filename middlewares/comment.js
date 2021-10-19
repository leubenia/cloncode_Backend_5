const { sequelize, Sequelize } = require('../models');

function commentget(num) {
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

module.exports = { commentget };
