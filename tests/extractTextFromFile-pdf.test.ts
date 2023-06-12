import { extractTextFromFile } from '../src'

const testFilePath = './tests/data/microservices.pdf'
test('extractTextFromFile (pdf)', async () => {
  const extText = await extractTextFromFile({
    filepath: testFilePath,
  })
  expect(extText.mimeType).toBe('application/pdf')
  expect(extText.content.length).toBe(771934)
  expect(extText.content.substring(5698, 5725)).toBe(
    'microservices and container'
  )
})
