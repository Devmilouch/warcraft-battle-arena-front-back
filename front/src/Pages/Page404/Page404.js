import React from "react";
import Hero from "../../components/Hero/Hero";



const Page404 = (props) => {
    const title = `Erreur 404 !`;
    const txt = `Cette page n'existe pas.`;

    return(
        <>
            <Hero titre={title} txt={txt} />
            <div style={{height: "50vh"}}></div>
        </>
    );
};

export default Page404;