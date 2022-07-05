import { useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalContext";

import imgAttack from "../../images/attack.png";
import imgHp from "../../images/hp.png";
import styles from "./UnitItem.module.css";



const UnitItem = (props) => {
    const { usersList, setUsersList } = useContext(GlobalContext);

    const handleAddUnitToUserTeam = () => {
        if (((usersList[0].gold - props.cost)) >= 0) {
            const newTeam = [...usersList];
            newTeam[0].team.push(props.name);
            newTeam[0].gold -= props.cost;
            setUsersList(newTeam);
            // console.log(newTeam[0]);
        }
    }

    const userGold = usersList ? usersList[0].gold : null;

    const style = {
        backgroundImage: `url(${props.picture})`,
        opacity: userGold >= props.cost ? 1 : 0.7
    };

    return (
        <div className={styles.item_container} onClick={handleAddUnitToUserTeam} style={style}>
            <div className={styles.attack_hp_container}>
                <div className={styles.attack}>
                    <div>{props.attack}</div>
                    <img src={imgAttack} alt="dégâts" />
                </div>
                <div className={styles.hp}>
                    <div>{props.hp}</div>
                    <img src={imgHp} alt="vie" />
                </div>
            </div>
            <div className={styles.content_container}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.type_cost_container}>
                    <div className={styles.type}>Classe : {props.type}</div>
                    <div className={styles.cost}>Coût : {props.cost}</div>
                </div>
                {
                    (props.skillName && props.skillDescription) && (
                        <>
                            <div className={styles.skillName}>{props.skillName} :</div>
                            <div className={styles.skillDescription}>({props.skillDescription})</div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default UnitItem;