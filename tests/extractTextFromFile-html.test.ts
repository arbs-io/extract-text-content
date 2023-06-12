import { extractTextFromFile } from '../src'

const testFiletype = 'text/html'
const testFilePath = './tests/data/microservices.htm'
test('extractTextFromFile (htm)', async () => {
  const extText = await extractTextFromFile({
    filepath: testFilePath,
    filetype: testFiletype,
  })
  expect(extText.mimeType).toBe(testFiletype)
  expect(extText.content.length).toBe(1200997)
  expect(extText.content.substring(5412, 5440)).toBe(
    'proof-of-concept application'
  )
})
