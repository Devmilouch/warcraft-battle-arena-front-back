import { useContext } from "react";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import UnitItem from "./UnitItem/UnitItem";
import { GlobalContext } from "../../../context/GlobalContext";

import styles from "./TeamBuilder.module.css";



const TeamBuilder = (props) => {
    const { unitsList } = useContext(GlobalContext);

    let listToMap = null;

    if (Array.isArray(unitsList)) {
        listToMap = [];

        unitsList.forEach(unitObject => {
            listToMap.push(unitObject);
        });
    };

    return (
        <section className={styles.units_section}>
            <h2>{props.title}</h2>
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
                (
                    <div className={styles.grid_container}>
                        {
                            Array.isArray(listToMap) && listToMap.map((unit, index) => {
                                return <UnitItem key={index} picture={unit.picture} {...unit} />
                            })
                        }
                    </div>
                )
            }
        </section>
    );
};

export default TeamBuilder;