const validateEmail = require('./validateEmail').validateEmail;
const mUsers = require('../modules/users/model');

exports.validateNewUser = async (newUser) => {
    const {
        name,
        username,
        email,
        birthdate,
        password,
        passwordConfirm
    } = newUser;
    
    let message = '';

    if (!name || !username || !email || !birthdate || !password || !passwordConfirm) {
        message = 'Missing required fields';
        return { validation: false, message };
    }
    
    //username
    if (username.length > 20) {
        message = 'Username is too long';
        return { validation: false, message };
    }

    if (username.length < 4) {
        message = 'Username is too short';
        return { validation: false, message };
    }

    const user = await mUsers.getUserByUsername(username);

    if (user) {
        message = 'Username is already taken';
        return { validation: false, message };
    }

    //email
    if (email.length > 255) {
        message = 'Email is too long';
        return { validation: false, message };
    }

    if (email.length < 6) {
        message = 'Email is too short';
        return { validation: false, message };
    }

    if (!validateEmail(email)) {
        message = 'Email is not valid';
        return { validation: false, message };
    }

    const userByEmail = await mUsers.getUserByEmail(email);
    
    if (userByEmail) {
        message = 'Email is already in use';
        return { validation: false, message };
    }

    //password
    if (password !== passwordConfirm) {
        message = 'Passwords do not match';
        return { validation: false, message };
    }

    if (password.length < 8) {
        message = 'Password is too short';
        return { validation: false, message };
    }

    if (password.length > 20) {
        message = 'Password is too long';
        return { validation: false, message };
    }

    //name
    if (name.length > 255) {
        message = 'Name is too long';
        return { validation: false, message };
    }

    if (name.length < 2) {
        message = 'Name is too short';
        return { validation: false, message };
    }

    //birthdate
    const date = new Date(birthdate);
    if (date == 'Invalid Date') {
        message = 'Birthdate is not a valid date';
        return { validation: false, message };
    }

    const currentDate = new Date();

    if (date > currentDate) {
        message = 'Birthdate is in the future';
        return { validation: false, message };
    }

    const age = currentDate.getFullYear() - date.getFullYear();

    if (currentDate.getMonth() < date.getMonth() ||
        (currentDate.getMonth() == date.getMonth() && currentDate.getDate() < date.getDate())) {
        age--;
    }

    if (age < 18) {
        message = 'User is under 18';
        return { validation: false, message };
    }

    return {
        validation: true,
        message: 'User validated successfully'
    }
}