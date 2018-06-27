# express-debug-async-wrap [![npm](https://img.shields.io/npm/v/express-debug-async-wrap.svg?style=flat-square)]() [![npm](https://img.shields.io/npm/dm/express-debug-async-wrap.svg?style=flat-square)]() [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![npm](https://img.shields.io/npm/l/express-debug-async-wrap.svg?style=flat-square)](LICENSE)
express async wrapper that passes custom `debug` instance or logging function

## Install

```
npm i -S express-debug-async-wrap
or
npm install --save express-debug-async-wrap
```

## Use

In your route: Require and initialize with `debug` instance:

```js
const debug = require('debug')('myNamespace:myRouteName')
const wrapper = require(`express-debug-async-wrap`)(debug)
const express = require('express')

const router = express.Router()

router.get('/', wrapper(async (req, res) => {
  await ...
  await ...
  res.send('OK')
}))

module.exports = router
```

In your main app:

```js
const debug = require('debug')('myNamespace')
const express = require('express')
const app = express()
// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500
  let customDebug = debug
  if (err.debug) {
    customDebug = err.debug
    delete err.debug
  }
  if (err.status === 404) delete err.stack // Do not show error stack for 404's
  customDebug(err)

  res.status(err.status)
  res.json(err) // For JSON APIs
  // res.send(err) // Or send as text
})
```

## Related

- [express-route-autoloader](https://github.com/DiegoRBaquero/express-route-autoloader)
- [express-sequelize-crud-router](https://github.com/DiegoRBaquero/express-sequelize-crud-router)
- [sequelize-express-findbyid](https://github.com/DiegoRBaquero/sequelize-express-findbyid)

## License

MIT Copyright © [Diego Rodríguez Baquero](https://diegorbaquero.com)
