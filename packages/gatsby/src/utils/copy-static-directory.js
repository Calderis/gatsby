const fs = require(`fs-extra`)
const chokidar = require(`chokidar`)
const nodePath = require(`path`)

module.exports = () => {
  chokidar
    .watch(`${process.cwd()}/static`)
    .on(`add`, path => {
      const relativePath = nodePath.relative(`${process.cwd()}/static`, path)
      fs.copy(path, `${process.cwd()}/${process.env.GATSBY_OUTPUT_DIR}/${relativePath}`)
    })
    .on(`change`, path => {
      const relativePath = nodePath.relative(`${process.cwd()}/static`, path)
      fs.copy(path, `${process.cwd()}/${process.env.GATSBY_OUTPUT_DIR}/${relativePath}`)
    })
}
