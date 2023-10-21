const express = require("express");

const fs = require('fs');

const app = express();

const PORT =  3000;
app.listen(PORT, console.log(`Servidor Up ${PORT}`));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);
});

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
    res.json(canciones);
});

app.post("/canciones", (req, res) => {
    const nuevaCancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
    canciones.push(nuevaCancion);
    fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
    res.send("Cancion agregada exitosamente");
});

