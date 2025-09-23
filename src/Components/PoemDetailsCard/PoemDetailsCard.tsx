import React, { type MouseEventHandler } from "react";
import Card from "react-bootstrap/Card";
import { type Poem } from "../../Util/poem";
import "./PoemDetailsCard.css"
import { useNavigate } from "react-router";

const PoemDetailsCard : React.FC<Poem> = (poem: Poem) => {
    const  navigate = useNavigate();

    const onPoemClick : MouseEventHandler = () => {
        navigate("/poem", {state: {Poem: poem}})
    };

    return(
        <>
            <Card className="poem-details-card" onClick={onPoemClick}>
                <Card.Body>
                    <Card.Title className="mb-2">{poem.Title}</Card.Title>
                    <Card.Subtitle className="mb-3">{poem.Poet}</Card.Subtitle>
                    <Card.Text>{poem.Poem.substring(0, 100) + "..."}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default PoemDetailsCard;