# live-reload

A live reload server & client

## Example Server

``` js
var LiveReloadServer = require("live-reload")

var server = LiveReloadServer({
    cwd: "path to watch on"
    , ignore: "a filtering function"
})

server.listen(8080)
// Server now listening to port 8080 and any LiveReloadClient can connect to it
```

## Example client-side code

``` js
var LiveReloadClient = require("live-reload")

var client = LiveReloadClient(8080)

// client automatically hard reloads
```

## Installation

`npm install live-reload`

## Contributors

 - Raynos

## MIT Licenced