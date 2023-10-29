import { useState } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentification = () => {

    const [connection, setConnection] = useState(true);
    const [enregistrement, setEnregistrement] = useState(false);

    const HandleConnection = () => {
        if (!connection) {
            setConnection(true);
            setEnregistrement(false);
        }

    };

    const HandleEnregistrement = () => {
        if (!enregistrement) {
            setConnection(false);
            setEnregistrement(true);
        }
    };


    return (
        <div className='authentification'>
            <div>
                <span className={((connection) && (enregistrement === false) ? "" : "")} onClick={HandleConnection}>Connection</span>
                <span className={((!connection) && (enregistrement === true) ? "" : "")} onClick={HandleEnregistrement}>Enregistrement</span>
            </div>
            {connection && <SignIn />}
            {enregistrement && <SignUp />}

        </div>
    )
}

export default Authentification