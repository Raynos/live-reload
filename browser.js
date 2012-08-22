var shoe = require("shoe")

module.exports = LiveReloadClient

function LiveReloadClient(uri) {
    if (typeof uri === "number") {
        uri = "http://localhost:" + uri
    }

    var stream = shoe(uri + "/shoe")
    
    stream.on("data", ondata)
}

function ondata(data) {
    if (data === "reload") {
        document.location.reload()
    }
}