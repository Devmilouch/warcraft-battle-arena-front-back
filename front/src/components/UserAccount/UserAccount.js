import { useState } from "react";
import UserTeam from "./UserTeam/UserTeam";
import UpdateNameInput from "./UpdateNameInput/UpdateNameInput";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TeamBuilder from "./TeamBuilder/TeamBuilder";



const UserAccount = (props) => {
    const { userJWT } = useContext(GlobalContext);

    const [ actualUserTeam, setActualUserTeam ] = useState();

    return (
        <div>
            <UpdateNameInput />
            <UserTeam title="Votre équipe" username={userJWT ? userJWT.username : ""} actualUserTeam={actualUserTeam} setActualUserTeam={setActualUserTeam} />
            <TeamBuilder title="Choisissez vos unités" actualUserTeam={actualUserTeam} setActualUserTeam={setActualUserTeam} />
        </div>
    );
};

export default UserAccount;