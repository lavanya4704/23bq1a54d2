import { Log } from "./src/logger";

async function main() {
  await Log(
    "backend",
    "info",
    "service",
    "Testing logging middleware"
  );
}

main();