const jwt = require("jsonwebtoken");
require("dotenv").config()



module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.SECRET_JWT);
        const user_id = await decodedToken.user_id;
        const user_picture = await decodedToken.user_picture;
        const user_email = await decodedToken.user_email;
        const user = await decodedToken.user;
        const user_role = await decodedToken.user_role;

        req.auth = {
            user_id: user_id,
            user_picture: user_picture,
            user_email: user_email,
            user: user,
            user_role: user_role,
        };

        next();
    } catch (error) {
        res.status(401).json({
            status: "fail 🔥",
            error: `Token non valide : ${error}`
        })
    }
}