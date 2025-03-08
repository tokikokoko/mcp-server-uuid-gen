import z from "npm:zod";
import {
  Result,
  CallToolRequestSchema,
} from "npm:@modelcontextprotocol/sdk/types.js";

export type ToolHandlers = Record<
  string,
  (request: z.infer<typeof CallToolRequestSchema>) => Promise<Result>
>;
