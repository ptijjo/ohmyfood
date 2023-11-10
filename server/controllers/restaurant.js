require("dotenv").config();
const Restaurant = require("../models/restaurant");
const User = require("../models/user");




exports.findRestaurants = async (req, res) => {
    try {

        const restaurants = await Restaurant.find();

        res.status(200).json({
            status: "sucess 👍",
            length: restaurants.length,
            data: restaurants
        })

    } catch (error) {
        res.status(400).json({
            status: "fail 🔥",
            error: error
        })
    }
};


exports.newRestaurant = async (req, res) => {
    try {
        const user = await User.findById(req.auth.user_id)

        if (user.role !== "professionnel") {
            return res.status(400).json({
                status: "fail 🔥",
                error: "Opération non autorisé !"
            })
        };

        const restaurant = await new Restaurant({
            ...req.body,
        });

        restaurant.save();

        res.status(201).json({
            status: "sucess 👍",
            data: restaurant,
            createdAt: new Date().toISOString
        });


    } catch (error) {
        res.status(400).json({
            status: "fail 🔥",
            error: error
        })
    }
}