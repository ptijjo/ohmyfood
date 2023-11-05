const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();




exports.register = async (req, res) => {

    try {

        //Controle du mdp pour voir si il est strong
        if (!validator.isStrongPassword(req.body.password)) return res.status(400).json({
            status: "fail 🔥",
            error: "The passeword must have 8 caractere ,1 lowercase, 1 uppercase, 1 symbol and 1 number !"
        });

        const avatar = `${req.protocol}://${req.get('host')}/default_picture/avatar.jpg`;
        //hachage du mot de passe
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        //Création du nouvel utilisateur
        const user = await new User({
            ...req.body,
            password: passwordHash,
            picture: avatar
        });

        //Controle de l'adresse email pour savoir si elle est deja présente dans la base de données
        const email = await User.findOne({ email: req.body.email });

        //SI elle y existe on renvoi une erreur
        if (email) return res.status(401).json({
            status: "fail 🔥",
            error: `User already exist !`
        });
        //Sinon on sauvagarde le nouvel user dans la Bdd
        user.save();

        res.status(201).json({
            status: "sucess 👍",
            data: user,
            createdAt: new Date().toISOString
        });
    } catch (error) {
        res.status(400).json({
            status: "fail 🔥",
            error: error
        })
    }


};


exports.connection = async (req, res) => {

    try {

        //On recherche si cet adresse email existe
        const user = await User.findOne({ email: req.body.email })

        //Si il n'y existe pas on renvoie une erreur
        if (!user) return res.status(401).json({
            status: 'Fail 🔥',
            error: "Identifiants incorrects"
        });

        //sinon on compare le mot de passe lié a cet email
        const password = await bcrypt.compare(req.body.password, user.password)

        //Si le mdp correspond pas on renvoie une erreur
        if (!password) return res.status(401).json({
            status: 'Fail 🔥',
            error: "Identifiants incorrects"
        })

        //Sinon on crée un token d'authentification
        res.status(200).json({
            status: "Succes 👍",
            data: user,
            token: jwt.sign({
                user_id: user._id,
                user_firstName: user.firstName,
                user_email: user.email,
                user_lastName: user.lastName,
                user_picture: user.picture,
                user: `${user.firstName} ${user.lastName}`,
                user_role: user.role,
            },
                process.env.SECRET_JWT,
                { expiresIn: process.env.EXPIRE_TIME_JWT })
        })


    } catch (error) {
        res.status(500).json({
            status: 'Fail 🔥',
            error: error
        });
    }
};


/*exports.updateUser = async (req, res) => {
    try {

        if (req.params.id !== req.auth.user_id) res.status(404).json({
            status: "fail 🔥",
            message: "Opération non authorisée !"
        });

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        res.status(200).json({
            status: "sucess 👍",
            data: user,
            updateAt: new Date().toISOString()
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail 🔥',
            error: error
        });
    }
};

exports.updateUserPicture = async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.id })

        if (req.params.id !== req.auth.user_id) res.status(404).json({
            status: "fail 🔥",
            message: "Opération non authorisée !"
        });

        const file = user.picture.split("/picture/")[1];

        if (file !== undefined) fs.unlink(`picture/${file}`, (error) => {
            if (error) console.log(error)
            else console.log(`${file} is deleted !`)
        });

        await User.updateOne({ _id: req.params.id }, {
            $set: {
                picture: `${req.protocol}://${req.get('host')}/picture/${req.file.filename}`.split(' ').join(''),
            }
        }, {
            new: true, upsert: true, setDefaultsOnInsert: true,
        });

        const new_user = await User.findOne({ _id: req.params.id })

        res.status(200).json({
            status: "sucess 👍",
            data: new_user
        })


    } catch (error) {
        res.status(400).json({
            status: 'fail 🔥',
            error: error
        });
    }
};*/


exports.findUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            status: "sucess 👍",
            length: users.length,
            data: users
        })

    } catch (error) {
        res.status(400).json({
            status: "fail 🔥",
            error: error
        })
    }
};

exports.findOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (user === null) return res.status(400).json({
            status: "fail 🔥",
            error: "Utilisateur introuvable !"
        })


        res.status(200).json({
            status: "sucess 👍",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            status: "fail 🔥",
            error: error
        })
    }
};

exports.who = async (req, res) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.SECRET_JWT);
        const user_id = await decodedToken.user_id;
        const user_picture = await decodedToken.user_picture;
        const user_email = await decodedToken.user_email;
        const user = await decodedToken.user;
        const user_role = await decodedToken.user_role;

        res.status(200).json({
            status: "succes 👍",
            user_id,
            user,
            user_email,
            user_picture,
            user_role,

        })
    } catch (error) {
        res.status(401).json({
            status: "fail 🔥",
            error: { error }
        })
    }
}