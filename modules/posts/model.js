const {queryMySQL} = require('../../database')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllPosts = async () => {
    const posts = await prisma.grows.findMany()
    return posts
}