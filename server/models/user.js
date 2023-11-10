const mongoose = require("mongoose");
const validator = require("validator");
const uniquevalidator = require('mongoose-unique-validator');
const mongodbError = require('mongoose-mongodb-errors');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "User must have a first name !"],
        trim: true,
        minLength: [2, "First name must have more than 1 caratere !"],
        maxLength: [20, "First name must have less than 20 caractere !"],
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, "User must have a last name !"],
        trim: true,
        minLength: [2, "Last name must have more than 1 caratere !"],
        maxLength: [20, "Last name must have less than 20 caractere !"],
        uppercase: true,
    },
    email: {
        type: String,
        unique: [true, "Use another email !"],
        required: [true, "User must have an email !"],
        trim: true,
        validate(v) {
            if (!validator.isEmail(v)) throw new Error("Choose a valid email ! ")
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, "User must have a password !"],
        validate(v) {
            if (!validator.isStrongPassword(v)) throw new Error("The password must have 8 caractere ,1 lowercase, 1 uppercase, 1 symbol and 1 number !")
        }

    },
    picture: {
        type: String,
    },
    contact: [String],

    role: {
        type: String,
        enum: ["particulier", "professionnel"],
        default: "particulier",

    }

});


userSchema.plugin(uniquevalidator);
userSchema.plugin(mongodbError);



module.exports = mongoose.model("users", userSchema);