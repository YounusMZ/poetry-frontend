export interface Poem {
    id: string;
    title: string;
    poem: string;
    poet: string;
    tags: string | null;
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
