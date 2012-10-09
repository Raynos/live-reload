#!/usr/bin/env node

var argv = require("optimist").argv

    , Reload = require("..")

Reload(argv).listen(argv.port || 9090)
