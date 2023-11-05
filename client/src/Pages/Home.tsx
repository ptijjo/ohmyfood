import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useQuery, useMutation } from '@tanstack/react-query';
import query from "../fn-query/Fn-query";
import Loading from '../Components/Loading';
import BarreRecherche from '../Components/BarreRecherche';
import Presentation from '../Components/Presentation';
import Menu from '../Components/Menu';


const Home = () => {

    const token = localStorage.getItem("token")

    //On récupere les données de la personne connectée grace au toekn enregistré dans le local storage
    const { isLoading, error, data: userConnected } = useQuery({
        queryKey: ['userConnected'],
        queryFn: () => query.userConnected(token),
    });

    if (isLoading) return <Loading />

    if (error) return error

    console.log(userConnected);


    return (
        <div className='home'>
            <Header userAvatar={userConnected?.data.user_picture} userName={userConnected?.data.user} />
            <main className='main'>
                <BarreRecherche />
                <Presentation />
                <Menu />

            </main>
            <Footer />
        </div>
    )
}

export default Home