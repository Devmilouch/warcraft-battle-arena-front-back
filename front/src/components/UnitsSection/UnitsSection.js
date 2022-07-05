import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { GlobalContext } from "../../context/GlobalContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchBar from "../SearchBar/SearchBar";
import UnitItem from "./UnitItem/UnitItem";

import imgLargeDivider from "./images/large-divider.png";
import styles from "./UnitsSection.module.css";



const UnitsSection = (props) => {
    const { unitsList, findUnits, usersList, findUsers } = useContext(GlobalContext);

    const [ cancelTokenSourceUnits, setCancelTokenSourceUnits ] = useState(axios.CancelToken.source());
    const [ cancelTokenSourceUsers, setCancelTokenSourceUsers ] = useState(axios.CancelToken.source());
    

    useEffect(() => {       
        findUnits(cancelTokenSourceUnits);

        if (props.username) findUsers(cancelTokenSourceUsers, props.username);       

        return () => {
            cancelTokenSourceUnits.cancel();
            cancelTokenSourceUsers.cancel();
        }
    }, []);

    let listToMap = null;

    if (props.username && Array.isArray(unitsList) && Array.isArray(usersList) && usersList[0].team) {
        // console.log(usersList[0].team)
        listToMap = [];
        usersList[0].team.forEach(unitName => {
            unitsList.forEach(unitObject => {
                if (unitName === unitObject.name) listToMap.push(unitObject);
            })
        })

        // console.log(listToMap);
    } else if (Array.isArray(unitsList)) {
        listToMap = [];
        unitsList.forEach(unitObject => {
            listToMap.push(unitObject);
        })
    }

    return (
        <section className={styles.units_section}>
            <h2>{props.title}</h2>
            <div className={styles.large_divider}>
                <img src={imgLargeDivider} alt="large divider" />
            </div>
            {
                props.searchBar && <SearchBar searchFor="units" />
            }
            {
                (!listToMap && unitsList !== "no match") ? (
                    <div className={styles.loading_spinner}>
                        <LoadingSpinner />
                    </div>
                )
                :
                unitsList === "no match" ? (
                    <span className={styles.error_message}>
                        Aucune unité ne correspond à la recherche.
                    </span>
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
                        Ce joueur n'a pas d'équipe.
                    </span>
                )
                :
                (
                    <div className={styles.grid_container}>
                        {
                            (Array.isArray(listToMap) && listToMap.length > 0) ? listToMap.map((unit, index) => {
                                return <UnitItem key={index} picture={unit.picture} {...unit} />
                            }) 
                            : <span className={styles.error_message}>Ce joueur n'a pas d'équipe.</span>
                        }
                    </div>
                )
            }
        </section>
    );
};

export default UnitsSection;