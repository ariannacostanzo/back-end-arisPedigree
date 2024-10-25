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
    userId,
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
    userId,
  };

  try {
    const dog = await prisma.dog.create({ data });
    res.status(201).send(dog);
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const index = async (req, res) => {
  try {
    //fare la paginazione
    const { page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    const totalItems = await prisma.dog.count();

    const totalPages = Math.ceil(totalItems / limit);

    const dogs = await prisma.dog.findMany({
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true,
        user: true,
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: dogs,
      page: parseInt(page),
      totalItems,
      totalPages,
    });
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const indexAll = async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany({
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true,
      },
    });
    res.status(200).send(dogs);
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const findSire = async (req, res) => {
  const { breedId, name } = req.query;

  try {
    // Trova i cani maschi e della razza specificata
    const filteredDogs = await prisma.dog.findMany({
      where: {
        sex: true,
        breedId: parseInt(breedId),
        name: {
          contains: name ? name.toLowerCase() : undefined,
        },
      },
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true,
      },
    });

    if (filteredDogs.length > 0) {
      res.status(200).send(filteredDogs);
    } else {
      res.status(404).send({ message: "No dogs found for this breed" });
    }
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const findDam = async (req, res) => {
  const { breedId, name } = req.query;

  try {
    // Trova i cani femmina e della razza specificata
    const filteredDogs = await prisma.dog.findMany({
      where: {
        sex: false,
        breedId: parseInt(breedId),
        name: {
          contains: name ? name.toLowerCase() : undefined,
        },
      },
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true,
      },
    });

    if (filteredDogs.length > 0) {
      res.status(200).send(filteredDogs);
    } else {
      res.status(404).send({ message: "No dogs found for this breed" });
    }
  } catch (error) {
    errorHandlerFunction(res, error);
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
  indexAll,
  findSire,
  findDam,
};
