"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromBuffer = exports.extractTextFromFile = void 0;
const fs = __importStar(require("fs"));
const mammoth_1 = __importDefault(require("mammoth"));
const node_html_markdown_1 = require("node-html-markdown");
function extractTextFromFile({ filepath, filetype, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const bufferArray = yield new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(filepath);
            const chunks = [];
            fileStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            fileStream.on('error', (error) => {
                reject(error);
            });
            fileStream.on('end', () => {
                // resolve(Buffer.concat(chunks))
                const uint8Array = new Uint8Array(Buffer.concat(chunks));
                resolve(uint8Array);
            });
        });
        return yield extractTextFromBuffer({ bufferArray, filetype });
    });
}
exports.extractTextFromFile = extractTextFromFile;
function extractTextFromBuffer({ bufferArray, filetype, }) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (filetype) {
            case 'application/pdf': {
                // // pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker')
                // pdfjsLib.GlobalWorkerOptions.workerSrc =
                //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.js'
                // const doc = await pdfjsLib.getDocument({
                //   data: bufferArray,
                //   useSystemFonts: true,
                // }).promise
                // const pageTexts = Array.from({ length: doc.numPages }, async (_, i) => {
                //   const page = await doc.getPage(i + 1)
                //   const textContent = await page.getTextContent()
                //   return textContent.items
                //     .filter((item): item is TextItem => 'str' in item)
                //     .map((token) => token.str)
                //     .join('')
                // })
                // const textExtract: TextExtract = {
                //   mimeType: filetype,
                //   content: (await Promise.all(pageTexts)).join(''),
                // }
                // return textExtract
                const textExtract = {
                    mimeType: 'error/not-implemented',
                    content: 'not-implemented',
                };
                return textExtract;
            }
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
                // i.e. docx file
                const buffer = Buffer.from(bufferArray.buffer);
                const docxResult = yield mammoth_1.default.extractRawText({
                    buffer: buffer,
                });
                const textExtract = {
                    mimeType: filetype,
                    content: docxResult.value,
                };
                return textExtract;
                // return docxResult.value
            }
            case 'text/markdown':
            case 'text/csv':
            case 'text/html': {
                const html = new TextDecoder().decode(bufferArray);
                const textExtract = {
                    mimeType: filetype,
                    content: node_html_markdown_1.NodeHtmlMarkdown.translate(html),
                };
                return textExtract;
                // return NodeHtmlMarkdown.translate(html)
            }
            case 'text/plain': {
                const textExtract = {
                    mimeType: filetype,
                    content: new TextDecoder().decode(bufferArray),
                };
                return textExtract;
                // return new TextDecoder().decode(bufferArray)
            }
            default:
                throw new Error('Unsupported file type');
        }
    });
}
exports.extractTextFromBuffer = extractTextFromBuffer;
