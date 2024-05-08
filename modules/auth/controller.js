const bcrypt = require('bcrypt');
const response = require('../../utils/response').response;
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const mAuth = require('./model');
const mUsers = require('../users/model');

async function validateNewUser(newUser) {
    let errors = [];

    //Validate username
    if (newUser.username.length < 4) {
        errors = [
            ...errors,
            {
                field: 'username',
                message: 'Username must have at least 4 characters.'
            }
        ];
    }

    if (newUser.username.length > 20) {
        if (!errors.find(error => error.field === 'username')) {
            errors = [
                ...errors,
                {
                    field: 'username',
                    message: 'Username must have at most 20 characters.'
                }
            ];
        }
    }

    const usernameAlreadyExists = await mUsers.getUserByUsername(newUser.username) !== null;

    if (usernameAlreadyExists) {
        if (!errors.find(error => error.field === 'username')) {
            errors = [
                ...errors,
                {
                    field: 'username',
                    message: 'Username already exists.'
                }
            ];
        }
    }

    //Validate name
    if (newUser.name.length < 4) {
        errors = [
            ...errors,
            {
                field: 'name',
                message: 'Name must have at least 4 characters.'
            }
        ];
    }

    if (newUser.name.length > 20) {
        if (!errors.find(error => error.field === 'name')) {
            errors = [
                ...errors,
                {
                    field: 'name',
                    message: 'Name must have at most 20 characters.'
                }
            ];
        }
    }

    //Validate email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(newUser.email)) {
        errors = [
            ...errors,
            {
                field: 'email',
                message: 'Invalid email.'
            }
        ];
    }

    const emailAlreadyExists = await mUsers.getUserByEmail(newUser.email) !== null;
    
    if (emailAlreadyExists) {
        if (!errors.find(error => error.field === 'email')) {
            errors = [
                ...errors,
                {
                    field: 'email',
                    message: 'Email already exists.'
                }
            ];
        }
    }

    //Validate password
    if (!newUser.password) {
        errors = [
            ...errors,
            {
                field: 'password',
                message: 'Password is required.'
            }
        ];
    }

    if (!newUser.confirmPassword) {
        errors = [
            ...errors,
            {
                field: 'confirmPassword',
                message: 'Confirm password is required.'
            }
        ];
    }

    if (newUser.password !== newUser.confirmPassword) {
        if (!errors.find(error => error.field === 'confirmPassword')) {
            errors = [
                ...errors,
                {
                    field: 'confirmPassword',
                    message: 'Passwords do not match.'
                }
            ];
        }
    }


    if (newUser.password.length < 8) {
        if (!errors.find(error => error.field === 'password')) {
            errors = [
                ...errors,
                {
                    field: 'password',
                    message: 'Password must have at least 8 characters.'
                }
            ];
        }
    }

    // Validate birthdate
    if (!newUser.birthdate) {
        errors = [
            ...errors,
            {
                field: 'birthdate',
                message: 'Birthdate is required.'
            }
        ];
    }

    if (newUser.birthdate) {
        const birthdate = new Date(newUser.birthdate);
        
        if (isNaN(birthdate)) {
            errors = [
                ...errors,
                {
                    field: 'birthdate',
                    message: 'Invalid birthdate.'
                }
            ];
        }

        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        if (age < 18) {
            if (!errors.find(error => error.field === 'birthdate')) {
                errors = [
                    ...errors,
                    {
                        field: 'birthdate',
                        message: 'You must be at least 18 years old.'
                    }
                ];
            }
        }
    }

    return {
        isValid: errors.length < 1,
        errors: errors || null
    }
}

exports.login = async (req, res) => {
    const body = req.body;
    console.log(body)
    const username = body.username;

    const user = await mAuth.getUserByUsernameForLogin(username);

    const token = jwt.sign({ user: user }, SECRET_KEY, { expiresIn: '1h' });

    if (user.length < 0) {
        return response(res, 404, 'User not found', null);
    }

    return response(res, 200, 'Login succesfully', token);
}

exports.signUp = async (req, res) => {
    const body = req.body;
    const password = body.password;
    const confirmPassword = body.confirmPassword;
    const username = body.username;
    const name = body.name;
    const email = body.email;
    const birthdate = body.birthdate;
    
    let newUser = {
        name: name,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        birthdate: birthdate
    }
    
    const validation = await validateNewUser(newUser);
    
    if (!validation.isValid) {
        return response(res, 400, 'Validation error', validation.errors);
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    newUser = {
        ...newUser,
        password: hashedPassword,
        birthdate: new Date(newUser.birthdate).toISOString()
    }

    const user = await mAuth.createUser(newUser);

    return response(res, 200, 'User created successfully.', user);
}