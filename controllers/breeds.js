const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const breed = await prisma.breed.create({ data });
    res.status(200).send(breed);
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const index = async (req, res) => {
  try {
    const breeds = await prisma.breed.findMany({
      include: {
        _count: {
          select: { dogs: true },
        },
      },
    });
    res.status(200).send(breeds);
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const show = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    const breed = await prisma.breed.findUnique({
      where: { id },
      include: {
        dogs: true,
      },
    });

    res.status(200).send(breed);
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const breed = await prisma.breed.delete({
      where: { id },
    });
    res.status(200).json([breed, `Hai elimato ${breed.name}`]);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

module.exports = {
  store,
  index,
  destroy,
  show,
};
