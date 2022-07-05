import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalContext";

import styles from "./SignInForm.module.css";



const SignInForm = (props) => {
    const { userJWT, handleSignInAndSaveUserJWT, errorSignInAndSignUp } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if (userJWT) navigate("/mon-compte");
    }, [userJWT])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username, password);
        handleSignInAndSaveUserJWT(username, password);
    }

    return (
        <div className={styles.form_container}>
            <form className={styles.form}>      
                <input value={username} onChange={e => setUsername(e.target.value)} name="username" type="text" className={styles.feedback_input} placeholder="Pseudo" />
                <input value={password} onChange={e => setPassword(e.target.value)} name="password" type="password" className={styles.feedback_input} placeholder="Mot de passe" />
                {
                    errorSignInAndSignUp && <span style={{ display: "block", marginBottom: "30px", color: "red" }}>{errorSignInAndSignUp}</span>
                }
                <button onClick={handleSubmit} className={styles.btn_submit}>Se connecter</button>
            </form>
        </div>
    );
};

export default SignInForm;