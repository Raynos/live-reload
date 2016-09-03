# live-reload

A live reload server & client

## Docs

```
Usage:

  live-reload [<path>...] --port=somePort --delay=someDelay
              --key=<path-to-key-file> --cert=<path-to-crt-file>

    Runs a live-reload server on the port. It listens to changes
        on one or more paths and sends reload commands to any 
        browser connected to it.

    If a delay is set then it will send the command once the
        file has changed and the delay has elapsed. This is
        useful if your changing many files at once and only
        want to reload say 1s after all files have been written
        to disk.

    If both key and cert are set, the server will run on https.

    To connect a browser to a live-reload server simply add
        <script src="//localhost:somePort"></script> to your page
```

## Installation

`npm install live-reload`

## Contributors

 - Raynos

## MIT Licenced
