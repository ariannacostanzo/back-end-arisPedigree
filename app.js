//express
const express = require("express");
const app = express();


//env
require("dotenv").config();
const port = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Il server funziona correttamente!</h1>");
});

//per leggere i json
app.use(express.json());


//avvio del server
app.listen(port, () => {
  console.log(`Server avviato su ${port}`);
});
