import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { GlobalContext } from "../../context/GlobalContext";

import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";



const SearchBar = (props) => {
    const { setUsersList, findUsers, findUnits } = useContext(GlobalContext);

    const [ searchValue, setSearchValue ] = useState("");

    const [ errorMessage, setErrorMessage ] = useState("");

    const [ cancelTokenSourceUnits, setCancelTokenSourceUnits ] = useState(axios.CancelToken.source());
    const [ cancelTokenSourceUsers, setCancelTokenSourceUsers ] = useState(axios.CancelToken.source());

    useEffect(() => {
        return () => {
            cancelTokenSourceUnits.cancel();
            cancelTokenSourceUsers.cancel();
        }
    }, [])

    const handleSearch = () => {
        if (searchValue.length === 1) return setErrorMessage("Au moins 2 caractères requis.");
        
        setErrorMessage("");
        setUsersList("");

        if (searchValue) {
            props.searchFor === "users" && findUsers(cancelTokenSourceUsers, searchValue);
            props.searchFor === "units" && findUnits(cancelTokenSourceUnits, searchValue);
        } else {
            props.searchFor === "users" && findUsers(cancelTokenSourceUsers);
            props.searchFor === "units" && findUnits(cancelTokenSourceUnits);
        }
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.search}>
                <input 
                    type="text" 
                    className={styles.searchTerm} 
                    placeholder="Rechercher" 
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
            {
                errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>
            }
        </div>
    );
};

export default SearchBar;