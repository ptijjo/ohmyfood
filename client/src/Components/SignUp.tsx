import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import Url from '../assets/UrlRouter';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    //Fonction  asynchrone qui soumet notre formulaire 
    const submit = async (data: FieldValues) => {

        try {

            // on attend la réponse de notre requete
            const response = await axios.post(Url.register, data);


            toast.success(`${response.data.user}`, {
                position: toast.POSITION.TOP_LEFT
            });
            reset();
            navigate("/");


        } catch (error) {

            // si il y'a une erreur on l'affiche lemessage dans un toast pendant 5s
            const erreur = error.response.data.error;

            toast.error(`${erreur}`, {
                position: toast.POSITION.TOP_LEFT
            });

        }

    }

    // Regex de validation du mot de passe contenant au moins 8 caractères, des lettres majuscules, des lettres minuscules, des chiffres et des caractères spéciaux
    const regPassword: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return (
        <form id="formSignIn" onSubmit={handleSubmit(submit)} autoComplete='off' className='formSign'>

            <input type='text' id="nom" placeholder='Nom...' autoComplete='off' className='input-form'{...register('lastName', { required: true, maxLength: 20, minLength: 2 })} /><br />
            {errors.lastName && errors.lastName.type === "required" && <p className='erreur-form'>Veuillez entrer un lastName !</p>}
            {errors.lastName && errors.lastName.type === "maxLength" && <p className='erreur-form'>Veuillez entrer un Nom avec moins de 20 caractères !</p>}
            {errors.lastName && errors.lastName.type === "minLength" && <p className='erreur-form'>Veuillez entrer un Nom avec au moins de 3 caractères !</p>}

            <input type='text' id="prenom" placeholder='Prénom...' autoComplete='off' className='input-form'{...register('firstName', { required: true, maxLength: 20, minLength: 2 })} /><br />
            {errors.firstName && errors.firstName.type === "required" && <p className='erreur-form'>Veuillez entrer un Prénom !</p>}
            {errors.firstName && errors.firstName.type === "maxLength" && <p className='erreur-form'>Veuillez entrer un Prénom avec moins de 20 caractères !</p>}
            {errors.firstName && errors.firstName.type === "minLength" && <p className='erreur-form'>Veuillez entrer un Prénom avec au moins de 3 caractères !</p>}

            <input type='email' id="email" placeholder='Email...' autoComplete='off' className='input-form'{...register('email', { required: true })} /><br />
            {errors.email && errors.email.type === "required" && <p className='erreur-form'>Veuillez entrer une adresse email valide !</p>}
            {errors.email && errors.email.type === "pattern" && <p className='erreur-form'>Veuillez entrer une adresse email valide !</p>}


            <input type='password' id="password" placeholder='Password...' autoComplete='off' className='input-form'{...register('password', { required: true, pattern: regPassword })} /><br />
            {errors.password && errors.password.type === "required" && <p className='erreur-form'>Veuillez entrer un mot de passe !"</p>}
            {errors.password && errors.password.type === "pattern" && <p className='erreur-form'>Mot de passe faible. Assurez-vous d'inclure au moins 8 caractères, des lettres majuscules, des lettres minuscules, des chiffres et des caractères spéciaux."</p>}

            <div className='form-radio'>
                <input type="radio" name="role" id="particulier" defaultChecked className='radio' value="particulier" {...register('role')} />
                <label htmlFor="particulier" className='label-radio1'> Particulier</label>
                <input type="radio" name="role" id="professionnel" className='radio' value="professionnel" {...register('role')} /><br />
                <label htmlFor="professionnel" className='label-radio2'>Professionnel</label>
            </div>



            <input type="submit" value="Enregistrer" className='btn-form' />
            <ToastContainer autoClose={3000} />
        </form>
    )
}

export default SignUp