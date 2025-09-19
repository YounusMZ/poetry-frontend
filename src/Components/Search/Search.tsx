import React, { type KeyboardEventHandler, type MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import searchPoem from "./../../Util/search";

const Search : React.FC = () => {    
    const inputRef = useRef<HTMLInputElement>(null);

    const onSearchEnter : KeyboardEventHandler = (event) => {
        if(event.key = "Enter"){
            const poemList = searchPoem(inputRef);

        }
    }

    const onSearchClick : MouseEventHandler = () => {
        const poemList = searchPoem(inputRef);
    }

    return(
        <>
            <input type="text" name='poemSearchKeys' id='nav-search' ref={inputRef} onKeyUp={onSearchEnter} />
            <Button variant='light' onClick={onSearchClick}>Search</Button>
            <Button variant='light'>Advanced Search</Button>
        </>
    );
};

export default Search;