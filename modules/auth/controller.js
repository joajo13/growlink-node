const bcrypt = require('bcrypt');
const response = require('../../utils/response').response;
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const mAuth = require('./model');
const validateNewUser = require('../../utils/userValidations').validateNewUser;

exports.login = async (req, res) => {
    const body = req.body;
    const usernameOrEmail = body.usernameOrEmail;
    const password = body.password;

    const user = await mAuth.getUserByUsernameOrEmail(usernameOrEmail);

    if (!user) {
        return response(res, 401, 'Invalid credentials', null);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return response(res, 401, 'Invalid credentials', null, {
            message: 'Invalid password'
        });
    }

    const userResponse = {
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        rol: parseInt(user.idRol),
    }
    
    const token = jwt.sign({ user: userResponse }, SECRET_KEY, { expiresIn: '24h' });
    
    userResponse.token = token;
    
    return response(res, 200, 'Login succesfully', {
        user: userResponse,
    });
}

exports.signup = async (req, res) => {
    const body = req.body;
    const newUser = {
        name: body.name,
        username: body.username,
        email: body.email,
        birthdate: body.birthdate,
        password: body.password,
        passwordConfirm: body.passwordConfirm,
        idRol: 3
    }

    console.log(newUser);
    const { validation, message } = await validateNewUser(newUser);

    if (!validation) {
        return response(res, 400, message, null);
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);
    delete newUser.passwordConfirm;

    const user = await mAuth.createUser(newUser);

    return response(res, 200, 'User created succesfully', user);
}