import type { Handler, User } from "../types/types";

export const handlerGetRequests: Handler = (request, response): void => {
  let users: Array<User> = []
  if (request.url === "/api/users") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  }
};
