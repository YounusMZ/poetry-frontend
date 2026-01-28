import React, { type KeyboardEventHandler, type MouseEventHandler } from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";

interface Properties{
    updateSearchString: (newString: String) => void,
};

const Search : React.FC<Properties> = (props: Properties) => {    
    const inputRef = useRef<HTMLInputElement>(null);

    const onSearchEnter : KeyboardEventHandler = (event) => {
        if(event.key == "Enter"){
            if(inputRef.current){
                const searchString = inputRef.current.value;
                props.updateSearchString(searchString.replace(" ", "+"));
            }
        }
    }

    const onSearchClick : MouseEventHandler = () => {
        if(inputRef.current){
            const searchString = inputRef.current.value;
            props.updateSearchString(searchString.replace(" ", "+"));
        }
    }

    return(
        <>
            <input className="nav-input-field" type="text" id='nav-search' placeholder="Search Poem" ref={inputRef} onKeyUp={(event) => {onSearchEnter(event)}} />
            <Button variant='light' onClick={onSearchClick}>Search</Button>
        </>
    );
};

export default Search;