import React, { useEffect, useState, type JSX} from "react";
import { useOutletContext } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { SearchResult } from "../../Util/poem";
import PoemDetailsCard from "../PoemDetailsCard/PoemDetailsCard";
import fetchContent from "./../../Util/request";

interface OutletPoemContext{
    randomPoems: SearchResult,
    setRandomPoems: React.Dispatch<React.SetStateAction<SearchResult>>
}

const RandomPoem: React.FC = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const { randomPoems, setRandomPoems} = useOutletContext<OutletPoemContext>();
    const [poemRowOne, setpoemRowOne] = useState<Array<JSX.Element>>();
    const [poemRowTwo, setpoemRowTwo] = useState<Array<JSX.Element>>();

    useEffect(() => {
        const rowOne: Array<JSX.Element> = [];
        const rowTwo: Array<JSX.Element> = [];

        if(!randomPoems){
            fetchContent(new URL(apiUrl + "/random"))
                .then((results: SearchResult) => {
                    setRandomPoems(results);
            });
        }
        else {
            Object.entries(randomPoems).forEach(([key, value]) => {
                let currentIndex: number = +key;
                    if (currentIndex < 5){
                        rowOne.push(
                            <Col key={value.Title + value.Poet} className="poem-column" xs={12} sm={6} md>
                                <PoemDetailsCard id={value.id} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null} isBookmarked={value.isBookmarked}/>
                            </Col>
                        );
                    }
                    else if(currentIndex < 10){
                        rowTwo.push(
                            <Col key={value.Title + value.Poet} className="poem-column" xs={12} sm={6} md>
                                <PoemDetailsCard id={value.id} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null} isBookmarked={value.isBookmarked}/>
                            </Col>
                        );
                    };
                });
            };
        setpoemRowOne(rowOne);
        setpoemRowTwo(rowTwo);
    }, [randomPoems])
    
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
        </>
    );
};

export default RandomPoem;