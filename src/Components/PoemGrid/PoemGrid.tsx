import React, { useEffect, useState, type JSX} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router";
import type { SearchResult } from "../../Util/poem";
import PoemDetailsCard from "../PoemDetailsCard/PoemDetailsCard";
import PageNumberSelector from "../PageNumberSelector/PageNumberSelector";
import "./PoemGrid.css";


const PoemGrid: React.FC = () => {
    const searchResults: SearchResult = useLocation().state?.searchResults;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [poemRowOne, setpoemRowOne] = useState<Array<JSX.Element>>();
    const [poemRowTwo, setpoemRowTwo] = useState<Array<JSX.Element>>();
    let noOfResults: number = 0;

    if(searchResults){
        noOfResults = Object.keys(searchResults).length;
    };

    useEffect(() => {
        const startIndex : number = currentPage * 10;
        const rowOne: Array<JSX.Element> = [];
        const rowTwo: Array<JSX.Element> = [];

        if(searchResults){
        Object.entries(searchResults).forEach(([key, value]) => {
            let currentIndex: number = +key;
            if(currentIndex >= startIndex){
                if (currentIndex < startIndex + 5){
                    console.log(value.Title)
                    rowOne.push(
                        <Col key={value.Title + value.Poet} xs={12} sm={6} md>
                            <PoemDetailsCard id={value.id} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null}/>
                        </Col>
                    );
                }
                else if(currentIndex < startIndex + 10){
                    console.log(value.Title)
                    rowTwo.push(
                        <Col key={value.Title + value.Poet} xs={12} sm={6} md>
                            <PoemDetailsCard id={value.id} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null}/>
                        </Col>
                    );
                };
            };
        });
    };
        setpoemRowOne(rowOne);
        setpoemRowTwo(rowTwo);
    }, [currentPage, searchResults]);
    
    console.log(poemRowOne, poemRowTwo)
    return(
        <>
            <Container className="poem-list-container">
                <Row className="poem-list-row-one mb-3">
                     {poemRowOne}
                </Row>
                <Row className="poem-list-row-two">
                    {poemRowTwo}
                </Row>
            </Container>
            <div className="page-number-selector text-center">
                <PageNumberSelector noOfResults={noOfResults} currentPage={currentPage} updatePageNumber={(pageNumber) => setCurrentPage(pageNumber)}/>
            </div>
        </>
    );
};

export default PoemGrid;