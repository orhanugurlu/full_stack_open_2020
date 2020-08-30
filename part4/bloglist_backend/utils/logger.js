const info = (...params) => {
  if (!process.env.IS_JEST) {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}