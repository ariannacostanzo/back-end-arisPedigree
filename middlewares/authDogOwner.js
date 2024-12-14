const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const errorHandlerFunction = require("../utils/errorHandlerFunction");

module.exports = async (req, res, next) => {
    const currUser = req.user;
    const id = parseInt(req.params.id);

    const dog = await prisma.dog.findUnique({ where: { id } });
    if (currUser.id != dog.userId) {
        return res.status(403).json({ error: "You aren't allowed to perform this action!" })
    }
    next();
}