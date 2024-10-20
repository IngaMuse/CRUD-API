import type { IncomingMessage, ServerResponse } from "node:http";

export type Handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>
) => void;