export function log(...args: any[]) {
  const msg = `[DEBUG ${new Date().toISOString()}] ${args.join(" ")}\n`;
  const encoder = new TextEncoder();
  Deno.stderr.write(encoder.encode(msg));
}
