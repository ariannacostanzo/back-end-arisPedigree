const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();
const baseUrl = "https://back-end-arispedigree-aq4t.onrender.com";
const path = require("path");
const fs = require("fs");
const generateAncestorInclude = require("../utils/generateAncestorInclude");
const deletePic = require("../utils/deletePic");

const store = async (req, res) => {
  const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;
  console.log("Image URL:", imageUrl);
  const {
    name,
    slug,
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
    slug: name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"),
    image: imageUrl,
    titles,
    sireId: sireId ? parseInt(sireId) : null,
    damId: damId ? parseInt(damId) : null,
    sex: sex === "true",
    size: size === "null" ? null : size,
    weight: weight === "null" ? null : weight,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : null,
    color,
    countryId: countryId ? parseInt(countryId) : null,
    breeder,
    kennel,
    owner,
    notes,
    breedId: parseInt(breedId),
    userId: parseInt(userId),
  };

  try {
    const dog = await prisma.dog.create({ data });
    res.status(201).send(dog);
  } catch (error) {
    if (req.file) {
      deletePic(req.file.filename);
    }
    errorHandlerFunction(res, error);
  }
};

const index = async (req, res) => {
  try {
    let { page = 1, limit = 12, sex, breed, order = "desc" } = req.query; //da aumentare
    sex = sex === "true" ? true : sex === "false" ? false : undefined;
    const offset = (page - 1) * limit;

    const whereConditions = {
      ...(sex !== undefined && { sex }),
      ...(breed && { breed: { name: breed } }),
    };

    // Count dei male
    const maleCount = await prisma.dog.count({
      where: {
        ...whereConditions,
        sex: true,
      },
    });

    // Count dei female
    const femaleCount = await prisma.dog.count({
      where: {
        ...whereConditions,
        sex: false,
      },
    });

    // const totalItems = await prisma.dog.count();
    const totalItems = await prisma.dog.count({
      where: whereConditions,
    });

    const totalPages = Math.ceil(totalItems / limit);

    const dogs = await prisma.dog.findMany({
      where: whereConditions,
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: {
        createdAt: order,
      },
    });

    res.status(200).json({
      data: dogs,
      page: parseInt(page),
      totalItems,
      totalPages,
      maleCount,
      femaleCount,
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
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Count dei male
    const maleCount = await prisma.dog.count({
      where: { sex: true },
    });

    // Count dei female
    const femaleCount = await prisma.dog.count({
      where: { sex: false },
    });

    res.status(200).send({
      dogs,
      maleCount,
      femaleCount,
    });
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const show = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.dog.findUnique({
      where: { id },
      include: {
        breed: true,
        country: true,
        childrenAsSire: {
          //figli
          include: {
            breed: true,
            country: true,
          },
        },
        // include dei figli anche i loro figli/e e padri/madri
        childrenAsDam: {
          include: {
            breed: true,
            country: true,
          },
        },
        //del padre include anche gli altri figli o figlie
        // Include ancestors up to the 8th generation through sire and dam
        sire: generateAncestorInclude(8),
        dam: generateAncestorInclude(8),
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (err) {
    errorHandlerFunction(res, err);
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;

  // Estraggo i dati dal body della request (I campi commentati non vengono modificati)
  const {
    name,
    slug,
    titles,
    // sireId,
    // damId,
    // sex,
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
    // breedId,
    userId,
  } = req.body;

  const data = {
    name,
    slug: name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"),
    image: imageUrl,
    titles,
    // sireId: sireId ? parseInt(sireId) : null,
    // damId: damId ? parseInt(damId) : null,
    // sex: sex === "true",
    size: size === "null" ? null : size,
    weight: weight === "null" ? null : weight,
    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    dateOfDeath: dateOfDeath ? new Date(dateOfDeath) : null,
    color,
    countryId: countryId ? parseInt(countryId) : null,
    breeder,
    kennel,
    owner,
    notes,
    // breedId: parseInt(breedId),
    userId: parseInt(userId),
  };

  try {
    if (imageUrl) {
      data.image = imageUrl;
    } else {
      const prevDog = await prisma.dog.findUnique({ where: { id } });
      data.image = prevDog.image;
    }

    const dog = await prisma.dog.update({
      where: { id },
      data: Object.keys(data).length ? data : undefined,
    });

    res.status(200).json({ message: `You modified the dog image`, data: dog });
  } catch (err) {
    if (req.file) {
      deletePic(req.file.filename);
    }
    errorHandlerFunction(res, err);
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
    const dog = await prisma.dog.findUnique({
      where: { id },
    });

    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }
    // Elimina l'immagine associata se esiste
    if (dog.image) {
      const imageName = dog.image.split("/").pop();
      const imagePath = path.join(__dirname, "../uploads", imageName);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Errore durante l'eliminazione dell'immagine:", err);
        } else {
          console.log("Immagine eliminata:", dog.image);
        }
      });
    }

    await prisma.dog.delete({
      where: { id },
    });
    res
      .status(200)
      .json([dog, `You have successfully eliminated "${dog.name}"`]);
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
  show,
  update,
};

//se voglio riavere i nipoti
// childrenAsSire: {
//   //nipoti
//   include: {
//     breed: true,
//     country: true,
//     childrenAsSire: {
//       //pronipoti
//       include: {
//         breed: true,
//         country: true,
//       },
//     },
//     childrenAsDam: {
//       //nipoti
//       include: {
//         breed: true,
//         country: true,
//       },
//     },
//   },
// },
// childrenAsDam: {
//   //nipoti
//   include: {
//     breed: true,
//     country: true,
//     childrenAsSire: {
//       //pronipoti
//       include: {
//         breed: true,
//         country: true,
//       },
//     },
//     childrenAsDam: {
//       //nipoti
//       include: {
//         breed: true,
//         country: true,
//       },
//     },
//   },
// },
