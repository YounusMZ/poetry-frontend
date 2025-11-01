import React from "react";
import fetchContent from "./request"
import { type SearchResult } from "./poem";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

const searchWithKeys = (searchKeyList: string[][]) => {
    const searchURL: URL = new URL(apiUrl + "/search");
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