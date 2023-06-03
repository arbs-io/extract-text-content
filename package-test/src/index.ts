import { extractTextFromFile } from '@arbs.io/extract-text-content'

//'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//Binary mime type using detection instead of ignore'
const docxPath = './data/microservices.docx'
extractTextFromFile({
  filepath: docxPath,
}).then((results) => {
  console.log(`docx (${docxPath})`)
  console.log(`\t- mime-type: ${results.mimeType}`)
  console.log(`\t- char-count: ${results.content.length}`)
  console.log(`\t- random-read: ${results.content.substring(2500, 2540)}`)
})

const txtType = 'text/plain'
const txtPath = './data/microservices.txt'
extractTextFromFile({
  filepath: txtPath,
  filetype: txtType,
}).then((results) => {
  console.log(`txt (${txtPath})`)
  console.log(`\t- mime-type: ${results.mimeType}`)
  console.log(`\t- char-count: ${results.content.length}`)
  console.log(`\t- random-read: ${results.content.substring(2500, 2540)}`)
})

//'application/pdf'
//Binary mime type using detection instead of ignore'
const pdfPath = './data/microservices.pdf'
extractTextFromFile({
  filepath: pdfPath,
}).then((results) => {
  console.log(`pdf (${pdfPath})`)
  console.log(`\t- mime-type: ${results.mimeType}`)
  console.log(`\t- char-count: ${results.content.length}`)
  console.log(`\t- random-read: ${results.content.substring(2500, 2540)}`)
})

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
