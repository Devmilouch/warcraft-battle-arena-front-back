import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { GlobalContext } from "../../../context/GlobalContext";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import UnitItem from "./UnitItem/UnitItem";

import styles from "./UserTeam.module.css";



const UserTeam = (props) => {
    const { unitsList, findUnits, usersList, setUsersList, findUsers, updateUserTeam, successMessageUpdateTeamGlobal, setSuccessMessageUpdateTeamGlobal } = useContext(GlobalContext);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ cancelTokenSourceUnits, setCancelTokenSourceUnits ] = useState(axios.CancelToken.source());
    const [ cancelTokenSourceUsers, setCancelTokenSourceUsers ] = useState(axios.CancelToken.source());

    useEffect(() => {       
        findUnits(cancelTokenSourceUnits);

        findUsers(cancelTokenSourceUsers, props.username);      

        return () => {
            cancelTokenSourceUnits.cancel();
            cancelTokenSourceUsers.cancel();
        }
    }, []);

    let listToMap = null;

    if (props.username && unitsList && Array.isArray(usersList) && usersList[0].team) {
        // console.log(usersList[0].team)
        listToMap = [];
        usersList[0].team.forEach(unitName => {
            unitsList.forEach(unitObject => {
                if (unitName === unitObject.name) listToMap.push(unitObject);
            })
        })

        // console.log(listToMap);
    }

    const handleResetLocalTeam = () => {
        const newTeam = [...usersList];
        newTeam[0].team = [];
        newTeam[0].gold = 140;
        setUsersList(newTeam);
        // console.log(newTeam[0]);
    }

    const handleUpdateUserTeam = () => {
        setErrorMessage("");
        setSuccessMessageUpdateTeamGlobal("");

        if (usersList[0].team.length <= 0) return setErrorMessage("Vous devez mettre au moins une unité.");

        updateUserTeam(usersList[0].team)
    }

    return (
        <section className={styles.units_section}>
            <h2>{props.title}</h2>
            {
                (Array.isArray(usersList) && usersList[0].gold) ? <div style={{ color: "#614326", marginBottom: "5px" }}>Pièces d'or : {usersList[0].gold}</div> : <div style={{color: "#614326"}}>Pièces d'or : 0</div>
            }
            {
                (!listToMap && usersList !== "no match") ? (
                    <div className={styles.loading_spinner}>
                        <LoadingSpinner />
                    </div>
                )
                :
                usersList === "no match" ? (
                    <span className={styles.error_message}>
                        Ce joueur n'existe pas.
                    </span>
                )
                :
                (props.username && usersList && !usersList[0].team) ? (
                    <span className={styles.error_message}>
                        Vous n'avez pas d'unités.
                    </span>
                )
                :
                (
                    <div>
                        <div className={styles.grid_container}>
                            {
                                Array.isArray(listToMap) && listToMap.map((unit, index) => {
                                    return <UnitItem key={index} picture={unit.picture} {...unit} />
                                })
                            }
                        </div>
                        <button className={styles.btn} onClick={handleResetLocalTeam} >Réinitialiser</button>
                        <button className={styles.btn} onClick={handleUpdateUserTeam}>Mettre à jour</button>
                        <div className={styles.messages}>
                            {
                                errorMessage && <span style={{ color: "red", marginTop: "10px"  }}>{errorMessage}</span>
                            }
                            {
                                successMessageUpdateTeamGlobal && <span style={{ color: "green", marginTop: "10px" }}>{successMessageUpdateTeamGlobal}</span>
                            }
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default UserTeam;