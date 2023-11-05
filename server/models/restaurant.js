const mongoose = require("mongoose");
const uniquevalidator = require('mongoose-unique-validator');
const mongodbError = require('mongoose-mongodb-errors');


const restaurantSchema = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Restaurant must have a name !"],
        trim: true,
        minLength: [2, "Name must have more than 1 caratere !"],
        maxLength: [20, "Name must have less than 20 caractere !"],
        lowercase: true
    },
    ville: {
        type: String,
        required: [true, "Restaurant must have a city !"],
        trim: true,
        minLength: [2, "Restaurant city must have more than 1 caratere !"],
        maxLength: [20, "Restaurant city must have less than 20 caractere !"],
        uppercase: true,
    },

    entree: [
        {
            nom: String,
            ingredient: String,
            prix: Number
        }
    ],

    plat: [
        {
            nom: String,
            ingredient: String,
            prix: Number
        }
    ],

    dessert: [
        {
            nom: String,
            ingredient: String,
            prix: Number
        }
    ],

    photo: {
        type: String,
    },
    contact: [{

    }],

});


restaurantSchema.plugin(uniquevalidator);
restaurantSchema.plugin(mongodbError);



module.exports = mongoose.model("restaurants", restaurantSchema);