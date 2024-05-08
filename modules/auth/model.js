const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getUserByUsernameForLogin = async(username) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        },
        select: {
            name: true,
            username: true,
        }
    })
    return user
}

exports.createUser = async (newUser) => {
    const user = await prisma.users.create({
        data: {
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            birthdate: newUser.birthdate,
            idRol: 2,
            password: newUser.password
        },
        select: {
            name: true,
            username: true,
            email: true,
            birthdate: true
        }
    })

    return user
}