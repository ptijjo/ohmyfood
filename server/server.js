const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require('mongoose');
const connection = require("./middleware/bdd_connection");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routers/user");
const restaurantRouter = require("./routers/restaurant");
const path = require("path");

connection(mongoose);

app
    .use(cors())
    .use(express.json())
    .use(morgan("dev"))
    .use('/default_picture', express.static(path.join(__dirname, 'default_picture')))

app
    .use(userRouter)
    .use(restaurantRouter)



server.listen(8080, () => {
    console.log("Notre serveur tourne correctement sur le port 8080 !");
})