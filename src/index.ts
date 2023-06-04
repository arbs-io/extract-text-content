import * as fs from 'fs'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import { NodeHtmlMarkdown } from 'node-html-markdown'

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
      const uint8Array = new Uint8Array(Buffer.concat(chunks))
      resolve(uint8Array)
    })
  })
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
      const buffer = Buffer.from(bufferArray.buffer)
      const pdfData = await pdfParse(buffer)
      const textExtract: TextExtract = {
        mimeType: filetype,
        content: pdfData.text,
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
