import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavbarAndSizeContext } from "../../context/NavbarAndSizeContext";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";

import navBackground from "./images/nav-background.png";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";



const Navbar = (props) => {
    const { actualScreenWidth, handleDropdown } = useContext(NavbarAndSizeContext);

    const { userJWT } = useContext(GlobalContext);

    return (
        <nav className={styles.navbar} style={{ backgroundImage: `url(${navBackground})` }}>
            <div className={styles.links_container}>
                <Link to="/">Accueil</Link>
                {
                    actualScreenWidth > 760 && (
                        <>
                            <Link to="/les-unites">Les unités</Link>
                            <Link to="/mon-compte">Mon compte</Link>
                        </>
                    )
                }
            </div>
            {
                actualScreenWidth > 760 ? (
                    <div className={styles.btns_container}>
                        {
                            !userJWT ? (
                                <>
                                <Button to="/connexion">Connexion</Button>
                                <Button to="/inscription">Inscription</Button>
                                </>
                            )
                            :
                            (
                                <Button to="/" disconnectUser={true}>Déconnexion</Button>
                            )
                        }
                    </div>
                )
                :
                (
                    <i className={styles.FaBars} onClick={handleDropdown}>
                        <FaBars />
                    </i>
                )
            }
        </nav>
    );
};

export default Navbar;