const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const tag = await prisma.country.create({ data });
    res.status(200).send(tag);
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const index = async (req, res) => {
  try {
    const countries = await prisma.country.findMany({
      include: {
        _count: {
          select: { dogs: true },
        },
      },
    });
    res.status(200).send(countries);
  } catch (error) {
    errorHandlerFunction(error);
  }
};


const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const country = await prisma.country.delete({
      where: { id },
    });
    res.status(200).json([country, `Hai elimato ${country.name}`]);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};


module.exports = {
  store,
  index,
  destroy
};
