// import { useParams } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserAccount from "../../components/UserAccount/UserAccount";



const UserAccountPage = (props) => {
    const { userJWT, checkUserJWT } = useContext(GlobalContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userJWT) navigate("/connexion");
        else checkUserJWT();
    }, [userJWT]);
    

    const title = `Votre compte`;
    const txt = `Vous pouvez modifiez votre nom d'utilisateur et votre équipe sur cette page.`;

    return(
        <>
            <Hero titre={title} txt={txt} />
            <UserAccount />
        </>
    );
};

export default UserAccountPage;