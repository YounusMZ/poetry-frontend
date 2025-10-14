import React from "react";
import fetchContent from "./request"
import { type SearchResult } from "./poem";

const searchWithKeys = (searchKeyList: string[][]) => {
    const mainUrl : string = window.location.hostname;
    const searchURL: URL = new URL("http://" + mainUrl + ":3000/search");
    const searchParams = new URLSearchParams(searchKeyList);
    searchURL.search = searchParams.toString();
    const fetchedPoems: Promise<SearchResult> = fetchContent(searchURL);
    return fetchedPoems;
};

const searchPoem = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
        const searchString: string = ref.current.value.replace(/ /g, "%20");
        const searchKeyList: string[][] = [["poem", searchString]];
        return searchWithKeys(searchKeyList);
    };
};

export default searchPoem;