#!/usr/bin/env node

//module dependencies
import {Server} from "../server"
import * as http from 'http'
import * as debug from 'debug'

const debuglog = debug("express:server");
// bind the debug logger to console log
//debuglog.log = console.log.bind(console)

//create http server
const httpPort = normalizePort(process.env.PORT || 1337);
const appServer = Server.bootstrap();
const app = appServer.app;
app.set("port", httpPort);
app.disable("x-powered-by")
const httpServer = http.createServer(app);


//listen on provided ports
httpServer.listen(httpPort);

//add error handler
httpServer.on("error", onError);

//start listening on port
httpServer.on("listening", onListening);

appServer.afterServerStart(httpServer);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var normalizedPort = parseInt(val, 10);

  if (isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var httpPort = httpServer.address();
  var bind = typeof httpPort === "string"
      ? "pipe " + httpPort
      : "port " + httpPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
  debuglog("Listening on " + bind);
}
