const jwt = require('jsonwebtoken');
const response = require('../../utils/response').response;

exports.isLogged = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return response(res, 401, 'Access denied.', null);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Acces denied.' });
        }
        next();
    });
}