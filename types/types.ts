import type { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => void;

type uuid = string;

export type UserData = {
  username: string;
  age: number;
  hobbies: string[];
}

export type User = {
  id: uuid;
  username: string;
  age: number;
  hobbies: string[];
};