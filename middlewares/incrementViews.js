const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const errorHandlerFunction = require("../utils/errorHandlerFunction");

module.exports = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    await Prisma.dog.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    next();
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};
