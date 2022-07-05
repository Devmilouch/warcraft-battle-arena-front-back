import { useState, useEffect, createContext } from "react";



export const NavbarAndSizeContext = createContext();

export const NavbarAndSizeContextProvider = props => {
    const [ actualScreenWidth, setActualScreenWidth ] = useState(window.innerWidth);
    const [ displayedDropdown, setDisplayedDropdown ] = useState(false);

    const checkScreenSize = () => {
        setActualScreenWidth(window.innerWidth);
    }

    const handleDropdown = () => {
        setDisplayedDropdown(!displayedDropdown);
    }

    useEffect(() => {
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        }
    }, []);

    return (
        <NavbarAndSizeContext.Provider
            value={{
                actualScreenWidth,
                displayedDropdown,
                handleDropdown
            }}
        >
            {props.children}
        </NavbarAndSizeContext.Provider>
    );
}