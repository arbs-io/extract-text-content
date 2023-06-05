This npm package, @arbs.io/extract-text-content, offers a straightforward method to extract text content from various binary and text file formats. The package comes with a pre-built configuration that works out-of-the-box, requiring no additional setup. It is designed for use in Node.js environments, including Visual Studio Code extensions.

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=arbs-io_extract-text-content&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=arbs-io_extract-text-content)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=arbs-io_extract-text-content&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=arbs-io_extract-text-content)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=arbs-io_extract-text-content&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=arbs-io_extract-text-content)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=arbs-io_extract-text-content&metric=bugs)](https://sonarcloud.io/summary/new_code?id=arbs-io_extract-text-content)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=arbs-io_extract-text-content&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=arbs-io_extract-text-content)

## Supported MIME Types

The current version of the package supports extraction from the following MIME types:

- PDF: `application/pdf`
- DOCX: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Markdown: `text/markdown`
- CSV `text/csv`
- HTML `text/html`
- Plain Text `text/plain`

## Requesting Additional File Support

If you would like to request support for additional file formats, please submit an enhancement issue on the project's repository. We appreciate your feedback and contributions to improve this package for developers.

Feel free to explore the documentation for more details on how to use this package effectively in your projects. Happy coding!

## Install

```sh
npm install @arbs.io/extract-text-content
```

If you use it with Webpack, you need the latest Webpack version and ensure you configure it correctly for ESM.

## Usage

#### Node.js

Extract text from file using binary format. If the file type is binary the mime-type is verified using [file-type](https://www.npmjs.com/package/file-type).

```ts
import { extractTextFromFile } from '@arbs.io/extract-text-content'

const pdfPath = './data/microservices.pdf'
extractTextFromFile({
  filepath: pdfPath,
}).then((results) => {
  console.log(`pdf (${pdfPath})`)
  console.log(`\t- mime-type: ${results.mimeType}`)
  console.log(`\t- char-count: ${results.content.length}`)
  console.log(`\t- random-read: ${results.content.substring(2500, 2540)}`)
})
```

Extract text from file using text format specifiying the mime-type to be used.

```ts
const htmlType = 'text/html'
const htmlPath = './data/microservices.htm'
extractTextFromFile({
  filepath: htmlPath,
  filetype: htmlType,
}).then((results) => {
  console.log(`html (${htmlPath})`)
  console.log(`\t- mime-type: ${results.mimeType}`)
  console.log(`\t- char-count: ${results.content.length}`)
  console.log(`\t- random-read: ${results.content.substring(2500, 2540)}`)
})
```

## API

### Response type

The `TextExtract` object provides the following properties

- mimeType: The mime-type is set to the format of the data send to the function.
- content: The raw text from the files

```ts
interface TextExtract {
  mimeType: string
  content: string
}
```

### extractTextFromFile

This package also offers a convenient function, `extractTextFromFile`, which extracts text content from various file formats using the provided file path or URL. Below is a detailed explanation of the parameters accepted by this function:

extractTextFromFile(filepath: string, filetype?: string): Promise<string>
Parameters

- `filepath` (Required): A string representing the path or URL to the file from which you want to extract text content. This parameter must be provided for the function to locate and process the input file.

- `filetype` (Optional): A string that serves as a hint for the file format being loaded. For binary formats, this hint will be validated based on the binary format's [magic number](<https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files>). If not provided, the function will attempt to determine the file type automatically.

```ts
function extractTextFromFile({
  filepath,
  filetype,
}: {
  filepath: string
  filetype?: string
}): Promise<TextExtract>
```

By using these parameters with the `extractTextFromFile` function, you can easily extract text content from supported file formats in your projects by providing a file path or URL.

### extractTextFromBuffer

This package offers a primary function, `extractTextFromBuffer`, which is used to extract text content from various file formats. Below is a detailed explanation of the parameters accepted by this function:

extractTextFromBuffer(bufferArray: Uint8Array, filetype?: string): Promise<string>

Parameters

- `bufferArray` (Required): A Uint8Array representation of the data blob. This parameter must be provided for the function to process and extract text content from the input file.

- `filetype` (Optional): A string that serves as a hint for the file format being loaded. For binary formats, this hint will be validated based on the binary format's [magic number](<https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files>). If not provided, the function will attempt to determine the file type automatically.

```ts
function extractTextFromBuffer({
  bufferArray,
  filetype,
}: {
  bufferArray: Uint8Array
  filetype: string
}): Promise<TextExtract>
```

By using these parameters with the `extractTextFromBuffer` function, you can easily extract text content from supported file formats in your projects.

## Dependancies

The liberary uses the following packages (many thanks for the authors)

- [file-type](https://www.npmjs.com/package/file-type)
- [mammoth](https://www.npmjs.com/package/mammoth)
- [node-html-markdown](https://www.npmjs.com/package/node-html-markdown)
- [pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist)
