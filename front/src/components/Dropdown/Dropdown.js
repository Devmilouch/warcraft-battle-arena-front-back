import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavbarAndSizeContext } from "../../context/NavbarAndSizeContext";
import { GlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";

import { ImCross } from "react-icons/im";
import imgDropdownBg from "./images/dropdown-background.png";
import styles from "./Dropdown.module.css";



const Dropdown = (props) => {
    const { displayedDropdown, handleDropdown } = useContext(NavbarAndSizeContext);
    const { userJWT } = useContext(GlobalContext);

    const style = {
        backgroundImage: `url(${imgDropdownBg})`,
        left: `${displayedDropdown ? "0" : "-100%"}`,
    };

    return (
            <div className={styles.dropdown_container} style={style}>
                <i className={styles.icon} onClick={handleDropdown}>
                    <ImCross />
                </i>
                <div className={styles.dropdown_wrapper}>
                    <div className={styles.links_container} onClick={handleDropdown}>
                        <Link to="/">Accueil</Link>
                        <Link to="/les-unites">Les unités</Link>
                        <Link to="/mon-compte">Mon compte</Link>
                    </div>
                    <div className={styles.btns_container}>
                        {
                            userJWT ? (
                                <Button to="/" useHandleDropdown={true} disconnectUser={true}>Déconnexion</Button>
                            )
                            :
                            (
                                <>
                                    <Button to="/connexion" useHandleDropdown={true}>Connexion</Button>
                                    <Button to="/inscription" useHandleDropdown={true}>Inscription</Button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
    );
};

export default Dropdown;