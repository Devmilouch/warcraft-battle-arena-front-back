import { useEffect, useContext } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from './Pages/Homepage/Homepage';
import Navbar from "./components/Navbar/Navbar";
import Dropdown from './components/Dropdown/Dropdown';
import Footer from './components/Footer/Footer';
import UnitsPage from './Pages/UnitsPage/UnitsPage';
import PlayerPage from './Pages/PlayerPage/PlayerPage';
import UserAccountPage from './Pages/UserAccountPage/UserAccountPage';
import SignInPage from './Pages/SignInPage/SignInPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import Page404 from './Pages/Page404/Page404';

import { GlobalContext } from './context/GlobalContext';
import "./reset.css";
import './App.css';



function App() {
  const { setSuccessMessageGlobal, setSuccessMessageUpdateTeamGlobal, setErrorMessageGlobal, setErrorSignInAndSignUp } = useContext(GlobalContext);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setErrorMessageGlobal("");
    setErrorSignInAndSignUp("");
    setSuccessMessageGlobal("");
    setSuccessMessageUpdateTeamGlobal("");
  }, [location.pathname])

  return (
      <>
        <Navbar />
        <Dropdown />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/les-unites" element={<UnitsPage />} />
          <Route path="/mon-compte" element={<UserAccountPage/>} />
          <Route path="/joueur/:username" element={<PlayerPage />} />
          <Route path="/connexion" element={<SignInPage />} />
          <Route path="/inscription" element={<SignUpPage />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
        <Footer />
      </>
  );
}

export default App;
