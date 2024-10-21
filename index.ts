import "dotenv/config";
import { createServer } from "node:http";
import { argv } from "node:process";
import { handlerGetRequests } from "./handlers/handlerGetRequests"
import { handlerPostRequests } from "./handlers/handlerPostRequests";
import { handlerPutRequests } from "./handlers/handlerPutRequests";
import { handlerDeleteRequests } from "./handlers/handlerDeleteRequests";
import { availableParallelism } from "node:os";
import cluster from "node:cluster";

const PORT = Number(process.env.PORT) || 3000;
const args = argv.slice(2);
const isMulti = !!args.find((arg) => arg === "--multi");
const cores = availableParallelism();


const server = createServer((request, response) => {
  try {
    const { url, method } = request;

    if (!url?.startsWith("/api/users")) {
      response.writeHead(404, "Not Found");
      response.end( "Invalid API Endpoint Route" );
    } else {
      switch (method) {
        case "GET":
          handlerGetRequests(request, response);
          break;
        case "POST":
          handlerPostRequests(request, response);
          break;
        case "PUT":
          handlerPutRequests(request, response);
          break;
        case "DELETE":
          handlerDeleteRequests(request, response);
          break;
        default:
          response.writeHead(405, "Invalid Request");
          response.end(
            JSON.stringify({ message: "Invalid API request method" })
          );
          break;
      }
    }
  } catch (error) {
    response.writeHead(500, "Server Error");
    response.end(JSON.stringify({ message: "Internal Server Error" }));
  }
});

if (cluster.isPrimary) {
  server.listen(PORT, () => {
    console.log(`Primary. Listen on port ${PORT}`);
  });

  if (isMulti) {
    Array.from({ length: cores - 1 })
      .map((_, index) => index + 1)
      .forEach((processId) => {
        cluster.fork({ PORT: PORT + processId });
      });
  }
} else {
  server.listen(PORT, () => {
    console.log(`Worker. Listen on port ${PORT}`);
  });
}