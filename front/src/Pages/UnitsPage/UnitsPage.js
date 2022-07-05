import Hero from "../../components/Hero/Hero";
import UnitsSection from "../../components/UnitsSection/UnitsSection";



const UnitsPage = (props) => {
    const title = "Les unités de Warcraft Battle Arena";
    const txt = "Formez votre équipe en choisissant les meilleures unités, en fonction de votre stratégie !";

    return(
        <>
            <Hero titre={title} txt={txt} />
            <UnitsSection title="Liste des unités" searchBar={true} />
        </>
    );
};

export default UnitsPage;