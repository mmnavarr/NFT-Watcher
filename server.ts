import http from "http";
import main from "./main";

const HTTP_HOST = "localhost";
const HTTP_PORT = 8008;

const server = http.createServer();

server.listen(HTTP_PORT, HTTP_HOST, async () => {
  console.log("Starting server");
  main();
});
