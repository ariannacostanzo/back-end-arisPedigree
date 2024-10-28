const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const prisma = new PrismaClient();
const baseUrl = "http://localhost:8000";

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

const show = async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.dog.findUnique({
      where: { id },
      include: {
        breed: true,
        country: true,
        childrenAsSire: true,
        childrenAsDam: true,
        sire: true,
        dam: true,
        user: true,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    errorHandlerFunction(res, err); 
  }
}

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;

  
  const data = {};

  
  if (imageUrl) {
    data.image = imageUrl;
  }

  try {
    
    const dog = await prisma.dog.update({
      where: { id },
      data: Object.keys(data).length ? data : undefined, 
    });

    res.status(200).json({ message: `You modified the dog image`, data: dog });
  } catch (err) {
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
  show,
  update
};
