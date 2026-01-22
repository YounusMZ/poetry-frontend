export interface Poem {
    id: string;
    Title: string;
    Poem: string;
    Poet: string;
    Tags: string | null;
    isBookmarked: number;
};

export interface SearchResult {
    id : Poem;
};

