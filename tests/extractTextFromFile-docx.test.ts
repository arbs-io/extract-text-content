import { extractTextFromFile } from '../src'

const testFilePath = './tests/data/microservices.docx'
test('extractTextFromFile (docx)', async () => {
  const extText = await extractTextFromFile({
    filepath: testFilePath,
  })
  expect(extText.mimeType).toBe(
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
  expect(extText.content.length).toBe(774401)
  expect(extText.content.substring(2499, 2546)).toBe(
    'guidance primarily at a development environment'
  )
})
