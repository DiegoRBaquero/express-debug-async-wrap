module.exports = debug =>
  fn =>
    (req, res, next) =>
      fn(req, res, next)
        .catch(e => {
          e.debug = debug
          next(e)
        })
