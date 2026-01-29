export interface Poem {
    id: string;
    Title: string;
    Poem: string;
    Poet: string;
    Tags: string | null;
    isBookmarked: number;
}

export interface SearchResult extends Poem {
    totalCount: number;
}

export interface PoemCollection {
    id: Poem;
}

export interface SearchResultCollection {
    id: SearchResult;
}
