import { useForm } from 'react-hook-form';


const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();




    return (
        <form onSubmit={handleSubmit((data) => console.log(data))} autoComplete='off'>
            <input type='email' placeholder='Email'{...register('firstName'), { required: true }} /><br />
            {errors.email && <p>Veuillez entrer une adresse email valide !</p>}


            <input {...register('lastName', { required: true })} /><br />
            {errors.lastName && <p>Last name is required.</p>}

            <input type="submit" value="Connection" />
        </form>
    )
}

export default SignIn