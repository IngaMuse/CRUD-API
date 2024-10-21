import { users } from "../db/userdb";
import type { Handler } from "../types/types";
import { setBadRequestAnswer } from "../utils/setBadRequest";
import { isValidUUID } from "../utils/userValidate";

export const handlerDeleteRequests: Handler = (request, response) : void => {
  
  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
    const userId = request.url.split("/")[3];
    const isValidUserUUID = isValidUUID(userId!);
    if (isValidUserUUID && userId) {
      const user = users.find((user) => user.id === userId);
      if (user) {
        const usersWithoutRemoved = users.filter((u) => u.id !== user.id);
        users.splice(0, users.length).concat(usersWithoutRemoved);
        response.writeHead(204, "OK");
        response.end(
          JSON.stringify({ message: `User Was Deleted` })
        );
      } else {
        setBadRequestAnswer(response, 404, "User With Provided Id Not Found");
      }
    }
  } else {
    setBadRequestAnswer(response, 400, "Invalid User Id or User Id Was Not Provided");
  }
}