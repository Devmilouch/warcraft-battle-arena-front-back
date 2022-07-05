import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { GlobalContext } from "../../context/GlobalContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBar/SearchBar";
import UserRow from "./UserRow/UserRow";

import imgLargeDivider from "./images/large-divider.png";
import styles from "./UsersSection.module.css";



const UsersSection = (props) => {
    const { usersList, findUsers } = useContext(GlobalContext);
    const [ cancelTokenSource, setCancelTokenSource ] = useState(axios.CancelToken.source());

    useEffect(() => {
        findUsers(cancelTokenSource);       

        return () => {
            cancelTokenSource.cancel();
        }
    }, []);

    return (
        <section className={styles.users_section}>
            <h2>Liste des joueurs</h2>
            <div className={styles.large_divider}>
                <img src={imgLargeDivider} alt="large divider" />
            </div>
            <SearchBar searchFor="users" />
            {
                !usersList ? (
                    <div className={styles.loading_spinner}>
                        <LoadingSpinner />
                    </div>
                )
                :
                usersList === "no match" ? (
                    <span className={styles.error_message}>
                        Aucun utilisateur ne correspond à la recherche.
                    </span>
                )
                :
                (
                    <ul>
                        {
                            usersList && usersList.map((user, index) => {
                                const isPair = index % 2;
                                return <UserRow key={index} username={user.username} gold={user.gold} bgColor={isPair === 0 && "rgba(97,67,38,.1)"} />
                            })
                        }
                    </ul>
                )
            }
        </section>
    );
};

export default UsersSection;