import fetchPoems from "./request"
import { type SearchResult } from "./poem";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

const searchPoem = (searchString: string) => {
    const searchKeyList: string[][] = [["poem", searchString]];
    const searchURL: URL = new URL(apiUrl + "/search");
    const searchParams = new URLSearchParams(searchKeyList);
    searchURL.search = searchParams.toString();

    const fetchedPoems: Promise<SearchResult> = fetchPoems(searchURL);
    return fetchedPoems;
};

export default searchPoem;