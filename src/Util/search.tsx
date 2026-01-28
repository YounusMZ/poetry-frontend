import fetchPoems from "./request"
import { type SearchResultCollection } from "./poem";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export const searchPoems = (searchString: string, pageNumber: number) => {
    const searchKeyList: string[][] = [["poem", searchString], ["page", pageNumber.toString()]];
    const searchURL: URL = new URL(apiUrl + "/search");
    const searchParams = new URLSearchParams(searchKeyList);
    searchURL.search = searchParams.toString();

    const fetchedPoems: Promise<SearchResultCollection> = fetchPoems(searchURL);
    return fetchedPoems;
};

export const getFavouritePoems = (pageNumber: number) => {
    const searchKeyList: string[][] = [["page", pageNumber.toString()]];
    const searchURL: URL = new URL(apiUrl + "/favourites");
    const searchParams = new URLSearchParams(searchKeyList);
    searchURL.search = searchParams.toString();
    console.log("main", searchURL.toString())

    const fetchedPoems: Promise<SearchResultCollection> = fetchPoems(searchURL);
    return fetchedPoems;
};