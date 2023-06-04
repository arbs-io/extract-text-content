const esbuild = require('esbuild')
const npmDts = require('npm-dts')
// import esbuild from 'esbuild'
// import npmDts from 'npm-dts'

const entryFile = 'src/index.ts'

const shared = {
  entryPoints: [entryFile],
  loader: { '.node': 'file' },
  bundle: true,
  minify: true,
  logLevel: 'info',
  platform: 'node',
}

esbuild.build({
  ...shared,
  outfile: 'dist/index.js',
  format: 'esm',
})

esbuild.build({
  ...shared,
  outfile: 'dist/index.cjs',
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
