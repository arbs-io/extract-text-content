import { extractTextFromFile } from '../src'

const testFilePath = './tests/data/microservices.pdf'
test('extractTextFromFile (pdf)', async () => {
  const extText = await extractTextFromFile({
    filepath: testFilePath,
  })
  expect(extText.mimeType).toBe('application/pdf')
  expect(extText.content.length).toBe(805605)
  expect(extText.content.substring(5699, 5742)).toBe(
    'Web MVC app, a Web SPA, and a native mobile'
  )
})
