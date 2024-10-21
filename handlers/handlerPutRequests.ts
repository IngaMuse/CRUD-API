import { users } from "../db/userdb";
import type { Handler, UserData } from "../types/types";
import { setBadRequestAnswer } from "../utils/setBadRequest";
import { isValidUserData, isValidUUID } from "../utils/userValidate";

export const handlerPutRequests: Handler = (request, response): void => {
  
  if (request.url?.match(/^\/api\/users\/([abcdef\-0-9]+)$/)) {
    const userId = request.url.split("/")[3];
    const isValidUserUUID = isValidUUID(userId!);
    if (isValidUserUUID && userId) {
      const user = users.find((user) => user.id === userId);
      if (user) {
        let body = "";
        request.on("data", (chunk) => (body += chunk.toString()));
        request.on("end", async () => {
          await new Promise((resolve, reject) => {
            try {
              const userData = JSON.parse(body) as UserData;
              resolve(userData);
            } catch (error) {
              reject(new Error());
            }
          })
          .then((userData) => {
            if (isValidUserData(userData)) {
              return userData as UserData;
            } else {
              throw new Error();
            }
          })
            .then(async (userData) => {
              const usersWithoutUpdated = users.filter((u) => u.id !== user.id);
              const updateUser = { ...userData, id: userId };
              users.splice(0, users.length).concat(usersWithoutUpdated).push(updateUser);
              return updateUser;
              }
            )
            .then((updateUser) => {
              response.writeHead(200, { "Content-Type": "application/json" });
              response.write(JSON.stringify(updateUser));
              response.end();
            })
            .catch(() => {
              setBadRequestAnswer(response, 400, "Body Doesn't Contain Required Fields");
            });
        });
      } else {
        setBadRequestAnswer(response, 404, "User With Provided Id Not Found")
      }
    }
  } else {
    setBadRequestAnswer(response, 400, "Invalid User Id or User Id Was Not Provided")
  }

}