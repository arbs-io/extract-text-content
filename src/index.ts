//https://snyk.io/blog/best-practices-create-modern-npm-package/
import * as fs from 'fs'
// import { fileTypeFromBuffer } from 'file-type'
// const ft = await import('file-type')
import mammoth from 'mammoth'
import { NodeHtmlMarkdown } from 'node-html-markdown'
// import pdfjsLib from 'pdfjs-dist'
// import { TextItem } from 'pdfjs-dist/types/src/display/api'
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'

export interface TextExtract {
  mimeType: string
  content: string
}

export async function extractTextFromFile({
  filepath,
  filetype,
}: {
  filepath: string
  filetype: string
}): Promise<TextExtract> {
  const bufferArray: Uint8Array = await new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filepath)
    const chunks: any[] = []
    fileStream.on('data', (chunk) => {
      chunks.push(chunk)
    })
    fileStream.on('error', (error) => {
      reject(error)
    })
    fileStream.on('end', () => {
      // resolve(Buffer.concat(chunks))
      const uint8Array = new Uint8Array(Buffer.concat(chunks))
      resolve(uint8Array)
    })
  })

  //Validate the mime type for binary formats
  // const validateFiletype = await ft.fileTypeFromBuffer(bufferArray)
  // if (validateFiletype) filetype = validateFiletype.mime

  return await extractTextFromBuffer({ bufferArray, filetype })
}

export async function extractTextFromBuffer({
  bufferArray,
  filetype,
}: {
  bufferArray: Uint8Array
  filetype: string
}): Promise<TextExtract> {
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

      const textExtract: TextExtract = {
        mimeType: 'error/not-implemented',
        content: 'not-implemented',
      }
      return textExtract
    }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      // i.e. docx file
      const buffer = Buffer.from(bufferArray.buffer)

      const docxResult = await mammoth.extractRawText({
        buffer: buffer,
      })
      const textExtract: TextExtract = {
        mimeType: filetype,
        content: docxResult.value,
      }
      return textExtract
      // return docxResult.value
    }
    case 'text/markdown':
    case 'text/csv':
    case 'text/html': {
      const html = new TextDecoder().decode(bufferArray)
      const textExtract: TextExtract = {
        mimeType: filetype,
        content: NodeHtmlMarkdown.translate(html),
      }
      return textExtract
      // return NodeHtmlMarkdown.translate(html)
    }
    case 'text/plain': {
      const textExtract: TextExtract = {
        mimeType: filetype,
        content: new TextDecoder().decode(bufferArray),
      }
      return textExtract
      // return new TextDecoder().decode(bufferArray)
    }
    default:
      throw new Error('Unsupported file type')
  }
}
