export type Categories = {
    [key: string]: {
        color: string;
        name: string;
    };
}

export type File = {
    code: string;
    meta: FileMeta;
    originalFile?: string;
}

export type FileMeta = {
    title: string;
    description: string;
    categories: string[];
    tableOfContents: TableOfContents;
    date: string;
    slug: string;
    likes: number;
}

export type TableOfContents = {
    text: string;
    link: string;
    children?: {
        text: string;
        link: string;
    }[];
}[];

export type SitemapFile = {
    name: string;
    lastMod: string;
}

export type PlaygroundRef = {
    getCode: () => void;
}