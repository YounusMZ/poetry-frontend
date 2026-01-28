import { type SearchResultCollection } from "./poem";

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
        .then((data: SearchResultCollection) => data)
        .catch((error) => {
                window.alert("Couldn't connect to server. Check your network connection and try again.");
                console.error(error);
                throw error;
            })
};

export default fetchPoems;