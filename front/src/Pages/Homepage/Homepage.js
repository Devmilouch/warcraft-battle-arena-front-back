import Hero from "../../components/Hero/Hero";
import UsersSection from "../../components/UsersSection/UsersSection";



const Homepage = props => {
    const title = "Warcraft Battle Arena";
    const txt = "Bienvenue sur Warcraft Battle Arena, un jeu compétitif où vous devrez vous faire une place dans l'arène !";

    return(
        <>
            <Hero titre={title} txt={txt} />
            <UsersSection />
        </>
    );
}

export default Homepage;