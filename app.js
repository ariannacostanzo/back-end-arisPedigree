//express
const express = require("express");
const app = express();
const cors = require("cors");

//routes
const countryRouter = require("./routes/countries.js");
const breedRouter = require("./routes/breeds.js");
const dogRouter = require("./routes/dogs.js");
const authRouter = require("./routes/auth.js");

const auth = require("./middlewares/auth.js"); //da usare nella rotta di creazione cane


app.use("/uploads", express.static("uploads"));

//env
require("dotenv").config();
const port = 8000;

app.use(cors());

//per leggere i json
app.use(express.json());




//rotte
app.use('/auth', authRouter)
app.use("/countries", countryRouter); 
app.use("/breeds", breedRouter); 
app.use("/dogs", dogRouter); 


//avvio del server
app.listen(port, () => {
  console.log(`Server avviato su ${port}`);
});


//fare opzione admin per user, aggiungere la foto, ed aggiungere i cani che ha pubblicato