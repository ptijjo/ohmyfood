require("dotenv").config();

const ID = process.env.ID_MONGOOSE;
const PASSWORD = process.env.PASSWORD_MONGOOSE;

const connection = async (mongoose) => {
    try {

        await mongoose.connect(`mongodb+srv://${ID}:${PASSWORD}@serveur.pps2dpk.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(`Not connected to mongoDB : ${error}`)
    }

}

module.exports = connection;