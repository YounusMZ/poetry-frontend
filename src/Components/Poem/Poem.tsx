import React from "react";
import { useLocation } from "react-router";
import "./Poem.css";

const Poem : React.FC = () => {
    const poem = useLocation().state?.Poem;
    console.log(poem.Poem);

    return(
        <>
            <div className="poem text-center mt-5">
                <h3>{poem.Title}</h3>
                <h6>{poem.Poet}</h6>
                <div className="poem-body">{poem.Poem}</div>
            </div>
        </>
    );

};

export default Poem;