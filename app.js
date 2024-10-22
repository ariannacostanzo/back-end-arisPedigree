//express
const express = require("express");
const app = express();

//routes
const countryRouter = require("./routes/countries.js");
const breedRouter = require("./routes/breeds.js");


//env
require("dotenv").config();
const port = 8000;


//per leggere i json
app.use(express.json());

//rotte
app.use("/countries", countryRouter); 
app.use("/breeds", breedRouter); 


//avvio del server
app.listen(port, () => {
  console.log(`Server avviato su ${port}`);
});
