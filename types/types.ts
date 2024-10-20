import type { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => void;


export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};