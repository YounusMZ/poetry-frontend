export interface Poem {
    id: string;
    Title: string;
    Poem: string;
    Poet: string;
    Tags: string | null;
};

export interface SearchResult {
    id : Poem;
};

