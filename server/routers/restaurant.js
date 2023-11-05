const router = require("express").Router();
const restaurantCtrl = require("../controllers/restaurant");
const auth = require("../middleware/auth");

router
    .get("/restaurant", auth, restaurantCtrl.findRestaurants)
    .post("/newRestaurant", auth, restaurantCtrl.newRestaurant)





module.exports = router;