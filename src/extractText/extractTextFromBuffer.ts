import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { ITextExtract } from '.'
import { fileTypeInfo } from '../magicBytes'

export async function extractTextFromBuffer({
  bufferArray,
  filetype,
}: {
  bufferArray: Uint8Array
  filetype?: string
}): Promise<ITextExtract> {
  const mimeType = fileTypeInfo(bufferArray).map((e) => (e.mime ? e.mime : ''))
  console.log(`Found: ${mimeType}`)

  const fileTypeInfos = fileTypeInfo(bufferArray)

  if (fileTypeInfos && fileTypeInfos.length > 0) {
    // filetype = fileTypeInfos[0].mime
    fileTypeInfos.forEach((info) => {
      console.log(`\tType:${info.typename} ${info.mime} ${info.extension}`)
    })
  }
  switch (filetype) {
    case 'application/pdf': {
      const buffer = Buffer.from(bufferArray.buffer)
      const pdfData = await pdfParse(buffer)
      const textExtract: ITextExtract = {
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
      const textExtract: ITextExtract = {
        mimeType: filetype,
        content: docxResult.value,
      }
      return textExtract
    }
    case 'text/markdown':
    case 'text/csv':
    case 'text/html': {
      const html = new TextDecoder().decode(bufferArray)
      const textExtract: ITextExtract = {
        mimeType: filetype,
        content: NodeHtmlMarkdown.translate(html),
      }
      return textExtract
    }
    case 'text/plain': {
      const textExtract: ITextExtract = {
        mimeType: filetype,
        content: new TextDecoder().decode(bufferArray),
      }
      return textExtract
    }
    default:
      throw new Error('Unsupported file type')
  }
}
