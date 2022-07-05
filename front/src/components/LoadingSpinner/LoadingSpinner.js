import styles from "./LoadingSpinner.module.css";



const LoadingSpinner = (props) => {
    return (
        <div className={styles.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
};

export default LoadingSpinner;