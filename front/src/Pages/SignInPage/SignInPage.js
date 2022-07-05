import SignInForm from "../../components/SignInForm/SignInForm";
import Hero from "../../components/Hero/Hero";



const SignInPage = (props) => {
    const title = "Connexion";
    const txt = "Connectez-vous à votre compte Warcraft Battle Arena.";

    return(
        <>
            <Hero titre={title} txt={txt} />
            <SignInForm />
        </>
    );
};

export default SignInPage;