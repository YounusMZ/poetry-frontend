import React, { useEffect, useState, type JSX} from "react";
import { useOutletContext } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { PoemCollection } from "../../Types/poem";
import PoemDetailsCard from "../PoemDetailsCard/PoemDetailsCard";
import fetchContent from "./../../Util/request";

interface OutletPoemContext{
    randomPoems: string[],
    setRandomPoems: React.Dispatch<React.SetStateAction<string[]>>,
    isRandomizeClicked: string[],
    setIsRandomizeClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const makePoemColumns = (results: PoemCollection): Array<JSX.Element> => {
    const columns: Array<JSX.Element> = [];
    if(results){
        Object.entries(results).forEach(([_key, value]) => {
            columns.push(
                    <Col key={value.title + value.poet} className="poem-column" xs={12} sm={6} md>
                        <PoemDetailsCard id={value.id} title={value.title} poet={value.poet} poem={value.poem} tags={null} isBookmarked={value.isBookmarked}/>
                    </Col>
                )
            })
        }
    return columns;
}

const RandomPoem: React.FC = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const { randomPoems, setRandomPoems } = useOutletContext<OutletPoemContext>();
    const [poemRowOne, setpoemRowOne] = useState<Array<JSX.Element>>();
    const [poemRowTwo, setpoemRowTwo] = useState<Array<JSX.Element>>();
    const [skipEffect, setSkipEffect] = useState<boolean>(false);

    useEffect(() => {
        if (!skipEffect){
            if (!randomPoems){
                fetchContent(new URL(apiUrl + "/random"))
                    .then((results: PoemCollection) => {
                        if(results){
                            const columns: Array<JSX.Element> = makePoemColumns(results);
                            const poemIndexes: string[] = Object.values(results).map((result) => result["id"]);
                            setpoemRowOne(columns.slice(0, 5));
                            setpoemRowTwo(columns.slice(5, 10));
                            setRandomPoems(poemIndexes);
                            setSkipEffect(true);
                        }
                })
            }
            else {
                fetchContent(new URL(apiUrl + "/poems?id=" + randomPoems.join("%2B")))
                    .then((results: PoemCollection) => {
                        if(results){
                            const columns: Array<JSX.Element> = makePoemColumns(results);
                            setpoemRowOne(columns.slice(0, 5));
                            setpoemRowTwo(columns.slice(5, 10));
                        }
                })
            }
        } else setSkipEffect(false);
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