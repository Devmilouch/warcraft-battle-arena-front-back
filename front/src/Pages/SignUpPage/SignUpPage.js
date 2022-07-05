import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Hero from "../../components/Hero/Hero";



const SignInPage = (props) => {
    const title = "Inscription";
    const txt = "Rejoignez Warcraft Battle Arena en créant votre compte !";

    return(
        <>
            <Hero titre={title} txt={txt} />
            <SignUpForm />
        </>
    );
};

export default SignInPage;