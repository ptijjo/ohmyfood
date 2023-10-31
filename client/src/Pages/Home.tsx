import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useQuery, useMutation } from '@tanstack/react-query';
import query from "../fn-query/Fn-query";
import Loading from '../Components/Loading';


const Home = () => {

    const token = localStorage.getItem("token")

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
            <Footer />
        </div>
    )
}

export default Home