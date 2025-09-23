import React, { useEffect, useState, type JSX } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation, useOutletContext } from "react-router";
import type { SearchResult } from "../../Util/poem";
import PoemDetailsCard from "../PoemDetailsCard/PoemDetailsCard";
import "./PoemGrid.css"


const PoemGrid = () => {
    const searchResults: SearchResult = useLocation().state?.searchResults;
    //console.log("Hello results:", searchResults);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [poemRowOne, setpoemRowOne] = useState<Array<JSX.Element>>();
    const [poemRowTwo, setpoemRowTwo] = useState<Array<JSX.Element>>();


    useEffect(() => {
        let currentIndex : number = currentPage;
        let rowOne: Array<JSX.Element> = [];
        let rowTwo: Array<JSX.Element> = [];

        if(searchResults){
        Object.entries(searchResults).forEach(([key, value]) => {
            if (currentIndex < currentPage + 5){
                
                rowOne.push(
                    <>
                        <Col>
                            <PoemDetailsCard index={value.index} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null}/>
                        </Col>
                    </>
                );
            }
            else if(currentIndex < currentPage + 10){
                //console.log(value.Poem, typeof value.Poem)
                rowTwo.push(
                    <>
                        <Col>
                            <PoemDetailsCard index={value.index} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null}/>
                        </Col>
                    </>
                );
            }
            currentIndex++;
        });
    }
        setpoemRowOne(rowOne);
        setpoemRowTwo(rowTwo);
    }, [currentPage, searchResults]);

    return(
        <>
            <Container className="poem-list-container">
                <Row className="poem-list-row-one mb-3">
                     {poemRowOne}
                </Row>
                <Row className="poem-list-row-one">
                    {poemRowTwo}
                </Row>
            </Container>
        </>
    );
};

export default PoemGrid;