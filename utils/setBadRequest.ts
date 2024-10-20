import { ServerResponse } from 'node:http'

export const setBadRequestAnswer = (response: ServerResponse, code: number, message: string) => {
  response.writeHead(code, { 'Content-Type': 'text/plain' })
  response.end(message)
} 