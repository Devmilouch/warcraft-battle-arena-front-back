import styles from "./Hero.module.css";
import heroBackground from "./images/hero-background.jpg";



const Hero = (props) => {
    return (
        <header className={styles.header_container} style={{ backgroundImage: `url(${heroBackground})` }}>
            <div className={styles.hero_content}>
                <h1>{props.titre}</h1>
                <p>{props.txt}</p>
            </div>
        </header>
    );
};

export default Hero;