const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email
        },
        select: {
            username: true,
            name: true,
            email: true,
        }
    })
    return user
}

exports.getUserByUsername = async (username) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true,
            email: true,
        }
    })
    return user
}

exports.getUserById = async (id) => {
    const user = await prisma.users.findUnique({
        where: {
            id: id
        },
        select: {
            username: true,
            name: true,
            email: true,
        }
    })
    return user
}
