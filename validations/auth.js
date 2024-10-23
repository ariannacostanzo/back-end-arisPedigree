const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerBody = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Please insert an email",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email format is not correct",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const user = await prisma.user.findUnique({
          where: { email: value },
        });
        if (user) {
          throw new Error("An user with this email already exists");
        }
        return true;
      },
    },
  },
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    isLength: {
      errorMessage: "Name must have at least 3 characters",
      options: { min: 3 },
    },
    custom: {
      options: async (value) => {
        const user = await prisma.user.findUnique({
          where: { name: value },
        });
        if (user) {
          throw new Error("An user with this username already exists");
        }
        return true;
      },
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Please insert a password",
      bail: true,
    },
    isString: {
      errorMessage: "Password must be a string",
      bail: true,
    },
  },
};

const loginBody = {
  emailOrUsername: {
    in: ["body"], 
    notEmpty: {
      errorMessage: "Please insert an email or username",
      bail: true,
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Please insert a password", 
      bail: true,
    },
    isString: {
      errorMessage: "Password must be a string",
      bail: true,
    },
  },
};

module.exports = {
  registerBody,
  loginBody,
};
