import axios from 'axios';
import Url from '../assets/UrlRouter';
const Fn = {

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