const mPosts = require('./model');
const response = require('../../utils/response').response;

exports.getPublicFeedPosts = async (req, res) => {

    const posts = await mPosts.getPublicFeedPosts();

    return response(res, 200, 'Posts found', posts);
}