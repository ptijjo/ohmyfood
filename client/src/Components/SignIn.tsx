/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import Url from '../assets/UrlRouter';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    //Fonction  asynchrone pour soumettre le formulaire
    const submit = async (data: FieldValues) => {
        try {

            // On va attendre la réponse de notre requete
            const response = await axios.post(Url.connection, data);

            // si le status de la réponse est "Succes👍" on enregistre le token dans le local storage et on retourne sur la page d'accueil
            if (response.data.status === "Succes 👍") {

                localStorage.setItem("token", response.data.token);
                navigate('/home');
            }

        } catch (error) {

            // Si il y'a une erreur on affiche le message dans un toast pendant 5s
            const erreur = error.response.data.error;

            toast.error(`${erreur}`, {
                position: toast.POSITION.TOP_LEFT
            });

        }
    }

    //Regex de validation de l'adresse email
    const regEmail: RegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;


    return (
        <form id="formSignIn" onSubmit={handleSubmit(submit)} autoComplete='off' className='formSign'>
            <input type='email' id="email" placeholder='Email...' autoComplete='off' className='input-form'{...register('email', { required: true, pattern: regEmail })} /><br />
            {errors.email && errors.email.type === "required" && <p className='erreur-form'>Veuillez entrer une adresse email valide !</p>}
            {errors.email && errors.email.type === "pattern" && <p className='erreur-form'>Veuillez entrer une adresse email valide !</p>}


            <input type='password' id="password" placeholder='Password...' autoComplete='off' className='input-form'{...register('password', { required: true })} /><br />
            {errors.password && <p className='erreur-form'>Veuillez entrer un mot de passe !"</p>}

            <input type="submit" value="Connection" className='btn-form' />
            <ToastContainer autoClose={3000} />
        </form>
    )
}

export default SignIn