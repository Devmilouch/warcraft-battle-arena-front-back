import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { NavbarAndSizeContext } from "../../context/NavbarAndSizeContext";
import { GlobalContext } from "../../context/GlobalContext";



const Button = (props) => {
    const navigate = useNavigate();
    
    const { handleDropdown } = useContext(NavbarAndSizeContext);
    const { handleLogout } = useContext(GlobalContext);

    const handleButtonActions = () => {
        if (props.useHandleDropdown) handleDropdown();

        if (props.disconnectUser) handleLogout();
        
        navigate(props.to);
    }

    return (
        <button onClick={handleButtonActions}>
            {props.children}
        </button>
    );
};

export default Button;