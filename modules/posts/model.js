const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getPublicFeedPosts = async () => {
    const posts = await prisma.grows.findMany()
    return posts
}