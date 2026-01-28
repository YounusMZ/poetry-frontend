import React, { useEffect, useState, type JSX} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PoemDetailsCard from "../PoemDetailsCard/PoemDetailsCard";
import PageNumberSelector from "../PageNumberSelector/PageNumberSelector";
import "./PoemGrid.css";
import  { searchPoems, getFavouritePoems } from "../../Util/search";
import { useLocation } from "react-router";
import type { SearchResultCollection } from "../../Util/poem";

const makePoemColumns = (results: SearchResultCollection): Array<JSX.Element> => {
    const columns: Array<JSX.Element> = [];
    if(results){
        Object.entries(results).forEach(([_key, value]) => {
            columns.push(
                    <Col key={value.Title + value.Poet} className="poem-column" xs={12} sm={6} md>
                        <PoemDetailsCard id={value.id} Title={value.Title} Poet={value.Poet} Poem={value.Poem} Tags={null} isBookmarked={value.isBookmarked}/>
                    </Col>
                )
            })
        }
    return columns;
}

const PoemGrid: React.FC = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);;
    const searchQueryPoem = searchQuery.get("poem") ?? "";
    const searchString = searchQueryPoem.replace(" ", "+");
    const pageNumberString = searchQuery.get("page") ?? "1";
    const pageNumber = parseInt(pageNumberString);

    const [poemRowOne, setpoemRowOne] = useState<Array<JSX.Element>>();
    const [poemRowTwo, setpoemRowTwo] = useState<Array<JSX.Element>>();
    const [noOfResults, setNoOfResults] = useState<number>();
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(pageNumber);

    const updatePageNumber = (newPageNumber: number) => {
        setCurrentPageNumber(newPageNumber);
    }

    useEffect(() => {
        console.log("pageNumber: ", currentPageNumber, " serachString: ", searchString);
        if(location.pathname == "/results"){
            searchPoems(searchString, currentPageNumber).then(
                (results: SearchResultCollection) => {
                    if(results){
                        const poemColumns = makePoemColumns(results);
                        setNoOfResults(Object.values(results)[0].totalCount);
                        setpoemRowOne(poemColumns.slice(0, 5));
                        setpoemRowTwo(poemColumns.slice(5, 10));
                    }
            })
        }
        else if (location.pathname == "/favourites"){
            getFavouritePoems(currentPageNumber).then(
                (results: SearchResultCollection) => {
                    if(results){
                        const poemColumns = makePoemColumns(results);
                        setNoOfResults(Object.values(results)[0].totalCount);
                        setpoemRowOne(poemColumns.slice(0, 5));
                        setpoemRowTwo(poemColumns.slice(5, 10));
                    }
            })
        }
    }, [currentPageNumber, searchQueryPoem]);
    
    return(
        <>
            <Container className="poem-list-container">
                <Row className="poem-list-row-one">
                    {poemRowOne}
                </Row>
                <Row className="poem-list-row-two">
                    {poemRowTwo}
                </Row>
            </Container>
            <div className="page-number-selector text-center">
                <PageNumberSelector noOfResults={noOfResults} currentPage={pageNumber} searchString={searchString} updatePageNumber={updatePageNumber}/>
            </div>
        </>
    );
};

export default PoemGrid;