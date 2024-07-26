export type GoogleBooksResponse = {
    kind: string;
    totalItems: number;
    items?: BookItem[];
};

export type BookItem = {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo?: SearchInfo;
};

export type VolumeInfo = {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount?: number;
    dimensions?: Dimensions;
    printType: string;
    categories?: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: PanelizationSummary;
    imageLinks?: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

export type IndustryIdentifier = {
    type: string;
    identifier: string;
};

export type ReadingModes = {
    text: boolean;
    image: boolean;
};

export type Dimensions = {
    height: string;
    width: string;
    thickness: string;
};

export type PanelizationSummary = {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
};

export type ImageLinks = {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
};

export type SaleInfo = {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: Price;
    retailPrice?: Price;
    buyLink?: string;
    offers?: Offer[];
};

export type Price = {
    amount: number;
    currencyCode: string;
};

export type Offer = {
    finskyOfferType: number;
    listPrice: Price;
    retailPrice: Price;
};

export type AccessInfo = {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: EpubInfo;
    pdf: PdfInfo;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
};

export type EpubInfo = {
    isAvailable: boolean;
    downloadLink?: string;
    acsTokenLink?: string;
};

export type PdfInfo = {
    isAvailable: boolean;
    downloadLink?: string;
};

export type SearchInfo = {
    textSnippet: string;
};
