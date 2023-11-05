import { useState } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentification = () => {

    const [connection, setConnection] = useState(true);
    const [enregistrement, setEnregistrement] = useState(false);

    //La fonction vérifie si on a cliqué sur l'onglet connection
    const HandleConnection = () => {
        if (!connection) {
            setConnection(true);
            setEnregistrement(false);
        }

    };

    //La fonction vérifie si on a cliqué sur l'onglet enregtistrement
    const HandleEnregistrement = () => {
        if (!enregistrement) {
            setConnection(false);
            setEnregistrement(true);
        }
    };


    return (
        <div className='authentification'>
            <div className='onglets-contents'>
                <span className={((connection) && (!enregistrement) ? "onglet" : "noChoice")} onClick={HandleConnection}>Connection</span>
                <span className={((!connection) && (enregistrement === true) ? "onglet" : "noChoice")} onClick={HandleEnregistrement}>Enregistrement</span>
            </div>
            {connection && <SignIn />}
            {enregistrement && <SignUp />}

        </div>
    )
}

export default Authentification