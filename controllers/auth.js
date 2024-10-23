const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction");
const { hashPassword, comparePassword } = require("../utils/password");
const generateToken = require("../utils/generateToken");
const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
     const { emailOrUsername, password } = req.body; 
     const user = await prisma.user.findFirst({
       where: {
         OR: [
           { email: emailOrUsername }, 
           { name: emailOrUsername },  
         ],
       },
     });

    const possibleMistake = new Error("passoword o email errati");

    if (!user) throw possibleMistake;

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) throw possibleMistake;    

    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = generateToken(data);
    res.json({ token, data });
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await hashPassword(password),
      },
    });

    const data = {
      id: user.id,
      email,
      name,
    };

    const token = generateToken(data);

    res.json({ token, email, name });
  } catch (error) {
    errorHandlerFunction(res, error);
  }
};

module.exports = {
  login,
  register,
};
