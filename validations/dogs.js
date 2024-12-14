const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const paramSlug = {
  slug: {
    in: ["params"],
    isString: {
      errorMessage: "Slug must be a string",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const dog = await prisma.dog.findUnique({
          where: { slug: value },
        });
        if (!dog) throw new Error("This dog doesn't exist");

        return true;
      },
    },
  },
};

const bodyData = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Please insert a name",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
  },
  breedId: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Please select a breed",
      bail: true,
    },
    isInt: {
      errorMessage: "Invalid type format for breedId",
      bail: true
    },
    custom: {
      options: async (value) => {
        const breedId = parseInt(value);
        const breed = await prisma.breed.findUnique({
          where: { id: breedId },
        });
        if (!breed) {
          throw new Error("This breed doesn't exist");
        }
      },
    },
  },
  countryId: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Please select a country",
      bail: true,
    },
    isInt: {
      errorMessage: "Invalid type format for countryId",
      bail: true
    },
    custom: {
      options: async (value) => {
        const countryId = Number(value);
        if (isNaN(countryId)) {

          throw new Error("Invalid country ID");
        }

        const country = await prisma.country.findUnique({
          where: { id: countryId },
        });

        if (!country) {
          throw new Error("This country doesn't exist");
        }
      },
    },
  },
  userId: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Missing user",
      bail: true,
    },
    isInt: {
      errorMessage: "Invalid type format for userId",
      bail: true
    },
    custom: {
      options: async (value) => {
        const userId = parseInt(value);
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user) {
          throw new Error("This user doesn't exist");
        }
      },
    },
  },
  notes: {
    optional: true,
    custom: {
      options: (value) => {
        if (value.length >= 1000) {
          throw new Error("Notes cannot be more than 1000 characters");
        }
        return true;
      },
    },
  },
};

module.exports = {
  paramSlug,
  bodyData,
};
