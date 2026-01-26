import React, { type KeyboardEventHandler, type MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { type SearchResult } from "./../../Util/poem";
import searchPoem from "../../Util/search";

interface Properties{
    updateResults: (newResults : SearchResult) => void,
};

const searchHandler = (props: Properties, searchString: string) => {
    const poemList : Promise<SearchResult> | undefined = searchPoem(searchString);
    poemList?.then((data : SearchResult) => {
        props.updateResults(data);
    })
}

const Search : React.FC<Properties> = (props: Properties) => {    
    const inputRef = useRef<HTMLInputElement>(null);

    const onSearchEnter : KeyboardEventHandler = (event) => {
        if(event.key == "Enter"){
            if(inputRef.current){
                const searchString = inputRef.current.value;
                searchHandler(props, searchString);
            }
        }
    }

    const onSearchClick : MouseEventHandler = () => {
        if(inputRef.current){
            const searchString = inputRef.current.value;
            searchHandler(props, searchString);
        }
    }

    return(
        <>
            <input type="text" id='nav-search' placeholder="Search Poem" ref={inputRef} onKeyUp={(event) => {onSearchEnter(event)}} />
            <Button variant='light' onClick={onSearchClick}>Search</Button>
        </>
    );
};

export default Search;