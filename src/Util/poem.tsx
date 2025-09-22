export interface Poem {
    "": string,
    Title: string,
    Poem: string,
    Poet: string,
    Tags: string | null,
}


export interface SearchResult {
    [index : number]: Poem;
}