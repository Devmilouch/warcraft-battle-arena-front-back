import styles from "./Footer.module.css";
import imgFooterBg from "./images/footer-background.png";



const Footer = (props) => {
    return (
        <footer className={styles.footer_container} style={{backgroundImage: `url(${imgFooterBg})`}}>
            <p>Tous droits réservés &copy;</p>
        </footer>
    );
};

export default Footer;