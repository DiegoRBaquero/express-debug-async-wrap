module.exports = debug =>
  fn =>
    (req, res, next) =>
      fn(req, res, next)
        .catch(e => {
          e.status = e.status || 400
          e.debug = debug
          next(e)
        })
