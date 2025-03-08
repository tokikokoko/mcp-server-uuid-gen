import { Server } from "npm:@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "npm:@modelcontextprotocol/sdk/types.js";
import { log } from "./util.ts";
import { GET_UUID_TOOL, UUID_HANDLERS } from "./tools.ts";

// Create server
const server = new Server(
  { name: "test", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  log("Received list tools request");
  return { tools: [GET_UUID_TOOL] };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  log("Received tool call:", toolName);

  try {
    if (toolName in UUID_HANDLERS) {
      return await UUID_HANDLERS[toolName](request);
    }

    throw new Error(`Unknown tool: ${toolName}`);
  } catch (error) {
    log("Error handling tool call:", error);
    return {
      toolResult: {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      },
    };
  }
});

// Handle tool calls
log("Start server");
try {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log("Server connected and running");
} catch (error) {
  log("Fatal error:", error);
  Deno.exit(1);
}
