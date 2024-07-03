const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getUserByUsernameOrEmail = async (usernameOrEmail) => {
    let user = await prisma.users.findUnique({
        where: { username: usernameOrEmail },
        select: {
            name: true,
            username: true,
            email: true,
            profilePic: true,
            password: true,
            idRol: true
        }
    })

    if (!user) {
        user = await prisma.users.findUnique({
            where: { email: usernameOrEmail },
            select: {
                name: true,
                username: true,
                email: true,
                profilePic: true,
                password: true,
            }
        })
    }

    return user
}

exports.createUser = async (newUser) => {
    const user = await prisma.users.create({
        data: {
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            birthdate: new Date(newUser.birthdate),
            idRol: 3,
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

exports.getAuthRoles = async () => {
    const roles = await prisma.roles.findMany({
        select: {
            id: true,
            rol: true
        }
    })

    return roles
}