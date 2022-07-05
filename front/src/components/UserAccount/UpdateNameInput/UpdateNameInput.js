import { useState, useContext } from "react";

import { GlobalContext } from "../../../context/GlobalContext";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import styles from "./UpdateNameInput.module.css";



const UpdateNameInput = (props) => {
    const { userJWT, updateUsername, deleteUserAccount, successMessageGlobal, setSuccessMessageGlobal, errorMessageGlobal, setErrorMessageGlobal } = useContext(GlobalContext);

    const [ searchValue, setSearchValue ] = useState(userJWT ? userJWT.username : "");
    const [ errorMessage, setErrorMessage ] = useState("");

    const handleSearch = () => {
        setErrorMessage("");
        setErrorMessageGlobal("");
        setSuccessMessageGlobal("");

        if (searchValue.length < 3) return setErrorMessage("Au moins 3 caractères requis.");
        if (searchValue.length > 15) return setErrorMessage("Au maximum 15 caractères.");
        if (userJWT.username.toLowerCase() === searchValue.toLowerCase()) return setErrorMessage("Nom identique au précédent.");

        updateUsername(searchValue);
    }

    const handleDeleteAccount = () => {
        if (window.confirm("Supprimer votre compte ?")) deleteUserAccount();
    }

    return (
        <div className={styles.wrap}>
            <label htmlFor="updateName" className={styles.labelInput}>Changer votre pseudo ?</label>
            <div className={styles.search}>
                <input 
                    id="updateName"
                    type="text" 
                    className={styles.searchTerm} 
                    placeholder="Votre pseudo" 
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    <BsFillArrowRightSquareFill />
                </button>
            </div>
            <div className={styles.messages_and_deleteBtn}>
                {
                    errorMessage && <span style={{ color: "red", marginTop: "3px" }}>{errorMessage}</span>
                }
                {
                    successMessageGlobal && <span style={{ color: "green", marginTop: "3px" }}>{successMessageGlobal}</span>
                }
                {
                    errorMessageGlobal && <span style={{ color: "red", marginTop: "3px" }}>{errorMessageGlobal}</span>
                }
                <button className={styles.delete_btn} onClick={handleDeleteAccount}>
                    Supprimer le compte /!\
                </button>
            </div>
        </div>
    );
};

export default UpdateNameInput;