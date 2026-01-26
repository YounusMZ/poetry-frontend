import { type SearchResult } from "./poem";

const fetchPoems = (url: URL) => {
    return fetch(url, {
        method: "GET",
        mode: "cors",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            return response.json();
        })
        .then((data: SearchResult) => data);
};

export default fetchPoems;