// types.ts
export interface MovieData {
    id: string;
    title: string;
    overview: string;
    cast: {
        id: string;
        name: string;
    };
    categories: {
        id: string;
        name: string;
        description: string;
    };
    directors: {
        id: string;
        name: string;
        age: number;
    };
    imageEntity: {
        id: string;
        original_filename: string;
        url: string;
    };
    publicationDate: string;
    studios: {
        id: string;
        name: string;
        country: string;
    };
    subCategories: {
        id: string;
        name: string;
        description: string;
    };
    typeStreaming: {
        id: string;
        name: string;
    };
}
