import { Tool } from "npm:@modelcontextprotocol/sdk/types.js";
import { ToolHandlers } from "./types.ts";

export const GET_UUID_TOOL: Tool = {
  name: "get_uuid",
  description: "その場でUUIDを生成します。",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export function handleGetUUid(): String {
  const u = crypto.randomUUID();
  return u.toString();
}

export const UUID_HANDLERS: ToolHandlers = {
  get_uuid: async (request) => {
    const results = handleGetUUid();
    return {
      toolResult: {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      },
    };
  },
};
