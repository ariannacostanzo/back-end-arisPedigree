const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const {
    name,
    slug,
    image,
    titles, 
    sireId,
    damId,
    sex,
    size,
    weight,
    dateOfBirth,
    dateOfDeath,
    color,
    countryId,
    breeder,
    kennel,
    owner,
    notes,
    breedId,
  } = req.body;

  const data = {
    name,
    slug,
    image, 
    titles,
    sireId,
    damId,
    sex,
    size,
    weight,
    dateOfBirth,
    dateOfDeath,
    color,
    countryId,
    breeder,
    kennel,
    owner,
    notes,
    breedId,
  };

  try {
    const dog = await prisma.dog.create({ data });
    res.status(201).send(dog); 
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const index = async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany({
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true
      },
    });
    res.status(200).send(dogs); 
  } catch (error) {
    errorHandlerFunction(error);
  }
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const dog = await prisma.dog.delete({
      where: { id },
    });
    res.status(200).json([dog, `Hai eliminato il cane ${dog.name}`]);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};
 
module.exports = {
  store,
  index,
  destroy,
};
