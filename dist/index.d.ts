interface TextExtract {
    mimeType: string;
    content: string;
}
declare function extractTextFromFile({ filepath, filetype, }: {
    filepath: string;
    filetype: string;
}): Promise<TextExtract>;
declare function extractTextFromBuffer({ bufferArray, filetype, }: {
    bufferArray: Uint8Array;
    filetype: string;
}): Promise<TextExtract>;

export { TextExtract, extractTextFromBuffer, extractTextFromFile };
