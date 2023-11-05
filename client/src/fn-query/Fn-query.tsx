import axios from 'axios';
import Url from '../assets/UrlRouter';

//Objet Fn qui contient toutes les requetes faites a notre serveur

const Fn = {

    //Fonction asynchrone qui reçoit en argument le token du localstoage afin d'obtenir les information de l'utilisateur connecté
    userConnected: async (token: string | null) => {

        try {

            const response = await axios.get(Url.who, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            return response

        } catch (error) {

            console.log(error)
        }
    },

}



export default Fn;