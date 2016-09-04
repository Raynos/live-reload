var shoe = require("shoe")
    , path = require("path")
    , watchr = require("watchr")
    , bundle = require("browserify-server")
    , openStreams = []

module.exports = LiveReloadServer

function LiveReloadServer(options) {
    var fs, httpsOpts, server, isHttps = false;
    if (options.key && options.cert) {
        fs = require("fs");
        httpsOpts = {
            key: fs.readFileSync(options.key),
            cert: fs.readFileSync(options.cert)
        };
        isHttps = true;
        server = require("https").createServer(httpsOpts, serveText)
    } else {
        server = require("http").createServer(serveText)
    }
    var sock = shoe(handleStream)
        , paths = options._ || process.cwd()
        , filterIgnored = options.ignore || noop
        , delay = options.delay || 1000
        , port = options.port || 9090
        , timer
        , source = bundle(path.join(__dirname, "reload.js"), {
            body: "require('./browser.js')(" + port + ")"
        })

    watchr.watch({
        paths: paths
        , listener: reload
        , ignoreHiddenFiles: true
        , ignorePatterns: true
    })

    sock.install(server, "/shoe")

    server.listen(port)

    console.log("Live reload server listening on port", port
                , "reloading on files. Using"
                , isHttps ? "https" : "http")


    function serveText(req, res) {
        res.setHeader("content-type", "application/javascript")
        res.end(source)
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
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            if (!filterIgnored(fileName)) {
                openStreams.forEach(sendMessage)
            }
        }, delay)
    }

    function sendMessage(stream) {
        stream && stream.write("reload")
    }
}

function noop() {}
