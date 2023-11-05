import BoutonMenu from "./BoutonMenu"

const Menu = () => {

    const bouton1 = {
        numero: 1,
        titre: "Choisissez un restaurant",
        icone: <i className="fa-solid fa-mobile-screen-button"></i>
    };

    const bouton2 = {
        numero: 2,
        titre: "Composez votre menu",
        icone: <i className="fa-solid fa-list"></i>
    };

    const bouton3 = {
        numero: 3,
        titre: "Dégustez votre restaurant",
        icone: <i className="fa-solid fa-store"></i>
    };




    return (
        <div className="menu">
            <h2>Fonctionnement</h2>
            <BoutonMenu numero={bouton1.numero} titre={bouton1.titre} icone={bouton1.icone} />
            <BoutonMenu numero={bouton2.numero} titre={bouton2.titre} icone={bouton2.icone} />
            <BoutonMenu numero={bouton3.numero} titre={bouton3.titre} icone={bouton3.icone} />
        </div>
    )
}

export default Menu