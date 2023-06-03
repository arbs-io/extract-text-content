'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
// import { extractTextFromFile } from '@arbs.io/extract-text-content'
var text_extract_1 = require('@arbs.io/extract-text-content')
var docxPath = './data/microservices.docx'
var docxType =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
;(0, text_extract_1.extractTextFromFile)({
  filepath: docxPath,
  filetype: docxType,
}).then(function (results) {
  console.log('docx-text: '.concat(results.length))
})
var txtPath = './data/microservices.txt'
var txtType = 'text/plain'
;(0, text_extract_1.extractTextFromFile)({
  filepath: txtPath,
  filetype: txtType,
}).then(function (results) {
  console.log('txt-text: '.concat(results.length))
})
var pdfPath = './data/microservices.pdf'
var pdfType = 'application/pdf'
;(0, text_extract_1.extractTextFromFile)({
  filepath: pdfPath,
  filetype: pdfType,
}).then(function (results) {
  console.log('pdf-text: '.concat(results.length))
})
