const express = require("express");

const fs = require('fs');

const app = express();

const PORT =  3000;
app.listen(PORT, console.log(`Servidor Up ${PORT}`));