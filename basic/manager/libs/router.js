let router = {}

function addRouter(method, url, fn) {
  method = method.toLowerCase()
  url = url.toLowerCase()

  if (!router[method]) {
    router[method] = {}
    router[method][url] = fn
  } else {
    router[method][url] = fn
  }
}

function findRouter(method, url) {
  console.log(method, url, router)
  method = method.toLowerCase()
  url = url.toLowerCase()

  if (!router[method] || !router[method][url]) {
    return null
  } else {
    return router[method][url]
  }
}

module.exports = {
  addRouter,
  findRouter,
}
