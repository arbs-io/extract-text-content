import { extractTextFromFile } from '../src'

const testFiletype = 'text/plain'
const testFilePath = './tests/data/microservices.txt'
test('extractTextFromFile (txt)', async () => {
  const extText = await extractTextFromFile({
    filepath: testFilePath,
    filetype: testFiletype,
  })
  expect(extText.mimeType).toBe(testFiletype)
  expect(extText.content.length).toBe(769578)
  expect(extText.content.substring(2511, 2540)).toBe(
    'development environment level'
  )
})
