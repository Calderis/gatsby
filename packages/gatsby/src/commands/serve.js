/* @flow weak */
const serve = require(`serve`)
const signalExit = require(`signal-exit`)

module.exports = program => {
  let { port, open, directory } = program
  port = typeof port === `string` ? parseInt(port, 10) : port
  const outputDirectory = process.env.GATSBY_OUTPUT_DIR || `public`
  let server = serve(`${directory}/${outputDirectory}`, { port, open })

  signalExit((code, signal) => {
    server.stop()
  })
}
