import { users } from "../db/userdb";
import type { Handler} from "../types/types";
import { setBadRequestAnswer } from "../utils/setBadRequest";
import { isValidUUID } from "../utils/userValidate";

export const handlerGetRequests: Handler = (request, response): void => {
  if (request.url?.match(/^\/api\/users$/)) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(users));
  }
  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
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
