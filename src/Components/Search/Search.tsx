import React, { type KeyboardEventHandler, type MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { type SearchResult } from "./../../Util/poem";
import searchPoem from "../../Util/search";

interface Properties{
    updateResults: (newResults : SearchResult) => void,
};

const Search : React.FC<Properties> = (props: Properties) => {    
    const inputRef = useRef<HTMLInputElement>(null);

    const onSearchEnter : KeyboardEventHandler = (event) => {
        if(event.key == "Enter"){
            const poemList : Promise<SearchResult> | undefined = searchPoem(inputRef);
            poemList?.then((data : SearchResult) => {
                props.updateResults(data);
            })
        }
    }

    const onSearchClick : MouseEventHandler = () => {
        const poemList : Promise<SearchResult> | undefined = searchPoem(inputRef);
            poemList?.then((data : SearchResult) => {
                props.updateResults(data);
            })
    }

    return(
        <>
            <input type="text" id='nav-search' ref={inputRef} onKeyUp={(event) => {onSearchEnter(event)}} />
            <Button variant='light' onClick={onSearchClick}>Search</Button>
        </>
    );
};

export default Search;