import { randomUUID } from "crypto";
import type { Handler, UserData } from "../types/types";
import { isValidUserData } from "../utils/userValidate";
import { setBadRequestAnswer } from "../utils/setBadRequest";
import { users } from "../db/userdb";

export const handlerPostRequests: Handler = (request, response): void => {
  if (request.url?.match(/^\/api\/users$/)) {
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
          const userToSave = { ...userData, id: randomUUID() };
          users.push(userToSave);
          return userToSave;
        })
        .then((userToSave) => {
          response.writeHead(201, { "Content-Type": "application/json" });
          response.write(JSON.stringify(userToSave));
          response.end();
        })
        .catch(() => {
          setBadRequestAnswer(response, 400, "Body Doesn't Contain Required Fields");
        });
    });
  } else {
    setBadRequestAnswer(response, 400, 'Invalid API Endpoint URL');
  }
}