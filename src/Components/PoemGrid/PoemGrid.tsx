import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useOutletContext } from "react-router";


const PoemGrid = () => {
    const searchResults = useOutletContext();
    console.log("Shut up", searchResults);
    
    return(
        <>
            <Container>
                
            </Container>
        </>
    );
};

export default PoemGrid;