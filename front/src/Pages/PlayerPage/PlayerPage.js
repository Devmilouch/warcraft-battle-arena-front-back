import { useParams } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import UnitsSection from "../../components/UnitsSection/UnitsSection";



const PlayerPage = (props) => {
    const { username } = useParams();

    const title = `Profil de ${username}`;
    const txt = `Découvrez l'équipe de ${username} !`;

    return(
        <>
            <Hero titre={title} txt={txt} />
            <UnitsSection title="Son équipe" username={username} />
        </>
    );
};

export default PlayerPage;