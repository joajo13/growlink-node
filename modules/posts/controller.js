const mPosts = require('./model');
const response = require('../../utils/response').response;

exports.getAllPosts = async (req, res) => {

    const posts = await mPosts.getAllPosts();

    return response(res, 200, 'Posts found', posts);
}