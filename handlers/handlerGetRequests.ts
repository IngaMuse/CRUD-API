import type { Handler, User } from "../types/types";
import { setBadRequestAnswer } from "../utils/setBadRequest";
import { isValidUUID } from "../utils/userValidate";

export const handlerGetRequests: Handler = (request, response): void => {
  let users: Array<User> = [];
  if (request.url === "/api/users") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  }

  if (request.url && request.url.startsWith("/api/users/")) {
    const userId = request.url.split("/")[3];
    const isValidUserUUID = isValidUUID(userId!);

    if (isValidUserUUID) {
      const user = users.find((user) => user.id === userId);

      if (user) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(users[0]));
        response.end();
        return;
      }
    } else
      setBadRequestAnswer(response, 404, "User With Provided Id Not Found");
  }
  setBadRequestAnswer(
    response,
    400,
    "Invalid User Id or User Id Was Not Provided"
  );
};
