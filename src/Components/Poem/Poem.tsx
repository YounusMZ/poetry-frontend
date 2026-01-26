import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type Poem } from "./../../Util/poem";
import "./Poem.css";

const getPoem = (apiUrl: string, poemId: number): Promise<Poem> => {
    return fetch(apiUrl + "/poem/" + poemId + ".json", {
        "method": "GET",
        "mode": "cors"
    })
        .then(res => {
                if(!res.ok){
                    throw new Error(`error status: ${res.status}`);
                }
                return res.json();
            })
        .then((data: Poem) => data);
}

const PoemView : React.FC = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const [poem, setPoem] = useState<Poem>({} as Poem);
    let { id } = useParams();

    useEffect(() => {
        if (id){
            const poemId = parseInt(id);
            
            getPoem(apiUrl, poemId).then(data => {
                setPoem(data)
            });
        }
    }, [])
    
    return(
        <>
            <div className="poem text-center mt-5">
                <h3>{poem.Title}</h3>
                <h6 id="poet-name">{poem.Poet}</h6>
                <div className="poem-body">{poem.Poem}</div>
            </div>
        </>
    );
};

export default PoemView;