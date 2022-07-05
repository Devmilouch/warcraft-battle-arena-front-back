import { useContext } from "react";

import { NavbarAndSizeContext } from "../../../context/NavbarAndSizeContext";
import { useNavigate } from "react-router-dom";

import imgGoldCoin from "./images/gold-coin.png";
import styles from "./UserRow.module.css";



const UserRow = (props) => {
    const { actualScreenWidth } = useContext(NavbarAndSizeContext);
    const navigate = useNavigate();

    return (
        <li className={styles.li_item} style={{backgroundColor: props.bgColor}} onClick={() => navigate(`/joueur/${props.username}`)}>
            <div>
                {props.username}
            </div>
            <div>
                {
                    actualScreenWidth >= 760 ? `Valeur de l'équipe : ${(props.gold - 140) * -1}` : `${(props.gold - 140) * -1}`
                }
            </div>
            <div className={styles.gold_coin_container}>
                <img src={imgGoldCoin} alt="gold coin" />
            </div>
        </li>
    );
};

export default UserRow;