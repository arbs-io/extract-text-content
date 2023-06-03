import esbuild from 'esbuild'
import npmDts from 'npm-dts'

const entryFile = 'src/index.ts'

const shared = {
  entryPoints: [entryFile],
  loader: { '.node': 'file' },
  bundle: true,
  minify: true,
}

esbuild.build({
  ...shared,
  outfile: 'dist/index.cjs',
  platform: 'node',
  logLevel: 'debug',
  format: 'cjs',
})

new npmDts.Generator({
  entry: entryFile,
  root: 'dist',
  output: 'dist/index.d.ts',
})
  .generate()
  .catch((err) => {
    console.log(err)
  })
