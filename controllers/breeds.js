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
    const breeds = await prisma.breed.findMany();
    res.status(200).send(breeds);
  } catch (error) {
    errorHandlerFunction(error);
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
  destroy
};
