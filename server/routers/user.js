const router = require("express").Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");






router
    .post("/newUser", userCtrl.register)
    .post("/connection", userCtrl.connection)
    .get("/who", auth, userCtrl.who)
    .get("/getUsers", auth, userCtrl.findUsers)
    .get("/getOneUser/:id", auth, userCtrl.findOneUser)
/* .patch("/updateUser/:id", auth, userCtrl.updateUser)
 .patch("/UpdateUserPicture/:id", auth, picture, userCtrl.updateUserPicture)*/








module.exports = router;