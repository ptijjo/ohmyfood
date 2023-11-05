import { useNavigate } from "react-router-dom"
import Logo from "../assets/img/logo/ohmyfood.png";


// On crée une props afin d'aficher l'image et le nom de la personne connectée
interface Props {
    userAvatar: string,
    userName: string
}

const Header = (props: Props) => {

    const navigate = useNavigate();

    //On crée la fonction retour a la page depart lorsqu'on clique sur le logo
    const homeBack = () => {

        navigate("/home");
    }

    return (
        <header className="header">

            <div className="logo-content" onClick={homeBack}>
                <img src={Logo} alt="logo" className="logo" />
            </div>

            <div className="user-content">
                <span className="user-avatar">
                    <img src={props.userAvatar} alt="" className="avatar" />
                </span>


            </div>

        </header>
    )
}

export default Header