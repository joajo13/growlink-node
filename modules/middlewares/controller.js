const jwt = require('jsonwebtoken');
const response = require('../../utils/response').response;
const mAuth = require('../auth/model');

exports.isLogged = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return response(res, 401, 'Access denied.', null);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return response(res, 401, 'Access denied.', null);
        }
        next();
    });
}

//allowedRoles = ['admin', 'user', 'productor']
exports.validatePermission = (...allowedRoles) => {
    return async (req, res, next) => {

        const token = req.headers['authorization'];

        if (!token) {
            return response(res, 401, 'Access denied.', null);
        }

        const roles = await mAuth.getAuthRoles();

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return response(res, 401, 'Access denied.', null);
            }

            const userRol = decoded.user.rol;

            const role = roles.find(role => role.id === userRol);

            if (!role) {
                return response(res, 401, 'Access denied.', null);
            }

            if (!allowedRoles.includes(role.rol)) {
                return response(res, 401, 'Access denied.', null);
            }

            next();
        });
    }
}