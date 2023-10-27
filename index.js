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

app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 4))
    res.send('Cancion borrada correctamente')
});

app.put('/canciones/:id', (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = canciones.findIndex(c => c.id == id)
    canciones[index] = cancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 4))
    res.send('Cancion modificada con exito')
    });

