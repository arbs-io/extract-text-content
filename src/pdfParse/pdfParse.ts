import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker'

interface RenderOptions {
  normalizeWhitespace: boolean
  disableCombineTextItems: boolean
}

interface Options {
  pagerender: (pageData: any) => Promise<string>
  max: number
}

interface Ret {
  numpages: number
  numrender: number
  info: any
  metadata: any
  text: string
  version: string | null
}

// let PDFJS: PDFJS | null = null

async function render_page(pageData: any): Promise<string> {
  const render_options: RenderOptions = {
    normalizeWhitespace: false,
    disableCombineTextItems: false,
  }

  let lastY: number | undefined
  let text: string = ''

  const textContent = await pageData.getTextContent(render_options)

  for (const item of textContent.items) {
    if (lastY == item.transform[5] || !lastY) {
      text += item.str
    } else {
      text += '\n' + item.str
    }
    lastY = item.transform[5]
  }

  return text
}

const DEFAULT_OPTIONS: Options = {
  pagerender: render_page,
  max: 0,
}

async function PDF(dataBuffer: Uint8Array, options?: Options): Promise<Ret> {
  const ret: Ret = {
    numpages: 0,
    numrender: 0,
    info: null,
    metadata: null,
    text: '',
    version: null,
  }

  options = options || DEFAULT_OPTIONS

  if (typeof options.pagerender != 'function')
    options.pagerender = DEFAULT_OPTIONS.pagerender
  if (typeof options.max != 'number') options.max = DEFAULT_OPTIONS.max

  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker
  ret.version = pdfjsLib.version

  // loadingTask.disableWorker = true
  pdfjsLib

  const loadingTask = await pdfjsLib.getDocument({
    data: dataBuffer,
  })
  const pdfDocument = await loadingTask.promise
  ret.numpages = pdfDocument.numPages

  const metaData = await pdfDocument.getMetadata().catch(function (err) {
    return null
  })

  ret.info = metaData ? metaData.info : null
  ret.metadata = metaData ? metaData.metadata : null

  let counter = options.max <= 0 ? pdfDocument.numPages : options.max
  counter = counter > pdfDocument.numPages ? pdfDocument.numPages : counter

  ret.text = ''

  for (let i = 1; i <= counter; i++) {
    const pageData = await pdfDocument.getPage(i)
    const pageText = await options.pagerender(pageData).catch((err) => {
      debugger
      return ''
    })

    ret.text = `${ret.text}\n\n${pageText}`
  }

  ret.numrender = counter
  pdfDocument.destroy()

  return ret
}

export default PDF
