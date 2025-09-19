import React from "react";

const fetchContent = (url: URL) => {
    return fetch(url, {
        method: "GET",
        mode: "cors",
    })
    .then(res => res.json())
    .then(data => data);
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
            const searchKeyList : string[][] = [["book", searchString]]
            searchWithKeys(searchKeyList);
        }
}

export default searchPoem;