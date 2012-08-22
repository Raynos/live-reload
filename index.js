var http = require("http")
    , shoe = require("shoe")
    , path = require("path")
    , hound = require("hound")
    , openStreams = []

module.exports = LiveReloadServer

function LiveReloadServer(options) {
    var server = http.createServer(serveText)
        , sock = shoe(handleStream)
        , cwd = options.cwd || process.cwd()
        , filterIgnored = options.ignore || noop

    var watcher = hound.watch(cwd)

    watcher.on("change", reload)
    watcher.on("create", reload)
    watcher.on("delete", reload)

    sock.install(server, "/shoe")

    return server

    function serveText(req, res) {
        res.end("live reload server running")
    }

    function handleStream(stream) {
        openStreams.push(stream)

        stream.on("end", remove)

        function remove() {
            var index = openStreams.indexOf(stream)
            if (index !== -1) {
                openStreams.splice(index, 1)
            }
        }
    }

    function reload(fileName) {
        if (!filterIgnored(fileName)) {
            openStreams.forEach(sendMessage)
        }
    }

    function sendMessage(stream) {
        stream && stream.write("reload")
    }
}

function noop() {}