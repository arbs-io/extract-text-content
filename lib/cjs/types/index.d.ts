export interface TextExtract {
    mimeType: string;
    content: string;
}
export declare function extractTextFromFile({ filepath, filetype, }: {
    filepath: string;
    filetype: string;
}): Promise<TextExtract>;
export declare function extractTextFromBuffer({ bufferArray, filetype, }: {
    bufferArray: Uint8Array;
    filetype: string;
}): Promise<TextExtract>;
//# sourceMappingURL=index.d.ts.map