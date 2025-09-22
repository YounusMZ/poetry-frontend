import React from "react";
import {type SearchResult} from "./poem";

const fetchContent = (url: URL) => {
    return fetch(url, {
        method: "GET",
        mode: "cors",
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`error status: ${response.status}`);
        }
        return response.json();
    })
    .then((data: SearchResult) => data);
};

const searchWithKeys = (searchKeyList : string[][]) => {
    const searchURL : URL = new URL("http://localhost:3000/search");
    const searchParams = new URLSearchParams(searchKeyList);
    searchURL.search = searchParams.toString();
    const fetchedPoems = fetchContent(searchURL);
    return fetchedPoems;
};

const searchPoem = (ref : React.RefObject<HTMLInputElement | null>) => {
    if(ref.current){
            const searchString : string = ref.current.value.replace(" ", "%20")
            const searchKeyList : string[][] = [["poem", searchString]]
            return searchWithKeys(searchKeyList);
        }
}

export default searchPoem;