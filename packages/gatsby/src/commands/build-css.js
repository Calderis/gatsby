/* @flow */
const webpack = require(`webpack`)
const fs = require(`fs-extra`)
const webpackConfig = require(`../utils/webpack.config`)

module.exports = async (program: any) => {
  const { directory } = program

  const compilerConfig = await webpackConfig(program, directory, `build-css`)
  const outputDirectory = process.env.GATSBY_OUTPUT_DIR || `public`

  return new Promise((resolve, reject) => {
    webpack(compilerConfig.resolve()).run(err => {
      if (err) {
        reject(err)
      }

      // We don't want any javascript produced by this step in the process.
      try {
        fs.unlinkSync(`${directory}/${outputDirectory}/bundle-for-css.js`)
      } catch (e) {
        // ignore.
      }

      // Ensure there's a styles.css file in output directory (default: public) so tools that expect it
      // can find it.
      fs.ensureFile(`${directory}/${outputDirectory}/styles.css`, err => {
        resolve(err)
      })
    })
  })
}
