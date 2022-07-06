import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";



export const GlobalContext = createContext();

export const GlobalContextProvider = props => {
    const [ userJWT, setUserJWT ] = useState(JSON.parse(localStorage.getItem('userJWT')));
    const [ usersList, setUsersList ] = useState();
    const [ unitsList, setUnitsList ] = useState();
    const [ loadingSpinner, setLoadingSpinner ] = useState(false);
    const [ requestInProgress, setRequestInProgress ] = useState(false);
    const [ successMessageGlobal, setSuccessMessageGlobal ] = useState("");
    const [ successMessageUpdateTeamGlobal, setSuccessMessageUpdateTeamGlobal ] = useState("");
    const [ errorMessageGlobal, setErrorMessageGlobal ] = useState("");
    const [ errorSignInAndSignUp, setErrorSignInAndSignUp ] = useState("");

    const navigate = useNavigate();

    const handleErrorToken = (errorType) => {
        localStorage.removeItem('userJWT');
        setUserJWT(null);

        if (errorType === "TokenExpiredError") navigate("/connexion");
        else if (errorType === "JsonWebTokenError") navigate("/");
    }

    const handleSignInAndSaveUserJWT = (username, password) => {
        if (!requestInProgress) {
            setRequestInProgress(true);

            axios.post("https://morning-journey-06244.herokuapp.com/api/sign-in", { username, password }, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                setRequestInProgress(false);
                localStorage.setItem('userJWT', JSON.stringify({
                    username: res.data.data.username,
                    gold: res.data.data.gold,
                    token: res.data.token
                }));
                setUserJWT(JSON.parse(localStorage.getItem('userJWT')));
                // console.log({
                //     username: res.data.data.username,
                //     gold: res.data.data.gold,
                //     token: res.data.token
                // });
            })
            .catch(error => {
                setRequestInProgress(false);
                setErrorSignInAndSignUp(error.response.data.message);
                console.log("Erreur : " + error);
            });
        } else {
            console.log("Request in progress...");
        };
    }

    const handleSignUpAndSaveUserJWT = (username, password) => {
        if (!requestInProgress) {
            setRequestInProgress(true);

            axios.post("https://morning-journey-06244.herokuapp.com/api/sign-up", { username, password }, { headers: { "Content-Type": "application/json" } })
            .then(res => {
                setRequestInProgress(false);
                handleSignInAndSaveUserJWT(username, password);
            })
            .catch(error => {
                setRequestInProgress(false);
                setErrorSignInAndSignUp(error.response.data.message);
                console.log("Erreur : " + error);
            })
        } else {
            console.log("Request in progress...");
        };
    }

    const handleLogout = () => {
        localStorage.removeItem('userJWT');
        setUserJWT(null);
    }

    const findUnits = (cancelTokenSource ,name = null) => {
        setUnitsList(null);

        if (name) {
            axios.get(`https://morning-journey-06244.herokuapp.com/api/all-units?name=${name}`, { headers: { "Content-Type": "application/json" }, cancelToken: cancelTokenSource.token})
            .then(res => {
                setUnitsList(res.data.data);
            })
            .catch(error => {
                console.log("Erreur : " + error.name);
                if (error.response.status === 404) {
                    setUnitsList("no match");
                    console.log("No match units");
                }
            });
        } else {
            axios.get("https://morning-journey-06244.herokuapp.com/api/all-units", { headers: { "Content-Type": "application/json" }, cancelToken: cancelTokenSource.token})
            .then(res => {
                setUnitsList(res.data.data);
            })
            .catch(error => {
                console.log("Erreur : " + error.name);
            });
        }
    }

    const findUsers = (cancelTokenSource, username = null) => {
        setUsersList(null);

        if (username) {
            axios.get(`https://morning-journey-06244.herokuapp.com/api/all-users?username=${username}`, { headers: { "Content-Type": "application/json" }, cancelToken: cancelTokenSource.token})
            .then(res => {
                const usersListResponse = [];
                res.data.data.forEach(user => {
                    if (!user.team) {
                        usersListResponse.push({...user, team: []});
                    } else {
                        usersListResponse.push({...user});
                    }
                })
                setUsersList(usersListResponse);
                // console.log(usersListResponse);
            })
            .catch(error => {
                console.log("Erreur : " + error);
                if (error.response.status === 404) setUsersList("no match");

            });
        } else {
            axios.get("https://morning-journey-06244.herokuapp.com/api/all-users", { headers: { "Content-Type": "application/json" }, cancelToken: cancelTokenSource.token})
            .then(res => {
                setUsersList(res.data.data);
            })
            .catch(error => {
                console.log("Erreur : " + error.response);
            });
        }
    }

    const checkUserJWT = () => {
        axios.get("https://morning-journey-06244.herokuapp.com/api/my-account", { headers: { 'Authorization': `Bearer ${userJWT.token}`, "Content-Type": "application/json" } })
        .then(res => {
        //    console.log("Token valid : " + res.data.data);
        })
        .catch(error => {
            console.log("Erreur : " + error.response.data.data.name);
            if (error.response.data.data.name === "TokenExpiredError") handleErrorToken("TokenExpiredError");
            if (error.response.data.data.name === "JsonWebTokenError") handleErrorToken("JsonWebTokenError")
        });
    }

    const updateUsername = (newUsername) => {
        if (!requestInProgress) {
            setRequestInProgress(true);

            axios.put("https://morning-journey-06244.herokuapp.com/api/update-username", {username: newUsername}, { headers: { 'Authorization': `Bearer ${userJWT.token}`, "Content-Type": "application/json" } })
            .then(res => {
                setRequestInProgress(false);
                setSuccessMessageGlobal(res.data.message);
                setUserJWT({
                    username: res.data.data.username,
                    token: userJWT.token
                });
            })
            .catch(error => {
                setRequestInProgress(false);
                setErrorMessageGlobal(error.response.data.message);
                console.log(error.response.data);
                if (error.data.data.name === "TokenExpiredError") handleErrorToken("TokenExpiredError");
                if (error.data.data.name === "JsonWebTokenError") handleErrorToken("JsonWebTokenError")
            });
        } else {
            console.log("Request in progress...");
        };
    }

    const updateUserTeam = (newUserTeam) => {
        if (!requestInProgress) {
            setRequestInProgress(true);

            axios.put("https://morning-journey-06244.herokuapp.com/api/update-user-team", {team: newUserTeam}, { headers: { 'Authorization': `Bearer ${userJWT.token}`, "Content-Type": "application/json" } })
            .then(res => {
                setRequestInProgress(false);
                setSuccessMessageUpdateTeamGlobal(res.data.message);
                // console.log(res.data.data);
            })
            .catch(error => {
                setRequestInProgress(false);
                // setErrorMessageGlobal(error.response.data.message);
                console.log(error.response.data);
                if (error.data.data.name === "TokenExpiredError") handleErrorToken("TokenExpiredError");
                if (error.data.data.name === "JsonWebTokenError") handleErrorToken("JsonWebTokenError")
            });
        } else {
            console.log("Request in progress...");
        };
    }

    const deleteUserAccount = () => {
        if (!requestInProgress) {
            setRequestInProgress(true);

            axios.delete("https://morning-journey-06244.herokuapp.com/api/delete-user", { headers: { 'Authorization': `Bearer ${userJWT.token}`, "Content-Type": "application/json" } })
            .then(res => {
                localStorage.removeItem('userJWT');
                setUserJWT(null);
                setRequestInProgress(false);
                console.log("Account deleted !");
            })
            .catch(error => {
                setRequestInProgress(false);
                console.log("Erreur : " + error);
                if (error.data.data.name === "TokenExpiredError") handleErrorToken("TokenExpiredError");
                if (error.data.data.name === "JsonWebTokenError") handleErrorToken("JsonWebTokenError")
            });
        } else {
            console.log("Request in progress...");
        };
    }

    return (
        <GlobalContext.Provider
            value={{
                userJWT,
                setUserJWT,
                handleSignInAndSaveUserJWT,
                handleSignUpAndSaveUserJWT,
                usersList,
                setUsersList,
                findUsers,
                unitsList,
                setUnitsList,
                findUnits,
                checkUserJWT,
                updateUsername,
                requestInProgress,
                loadingSpinner,
                setLoadingSpinner,
                updateUserTeam,
                deleteUserAccount,
                handleLogout,
                successMessageGlobal,
                setSuccessMessageGlobal,
                errorMessageGlobal,
                setErrorMessageGlobal,
                successMessageUpdateTeamGlobal,
                setSuccessMessageUpdateTeamGlobal,
                errorSignInAndSignUp,
                setErrorSignInAndSignUp
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}