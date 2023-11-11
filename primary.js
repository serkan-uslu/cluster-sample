import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;
console.log("Total number of CPUs: ", cpuCount);
console.log("Primary process id: ", process.pid);
cluster.setupPrimary({
  exec: `${__dirname}/index.js`,
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid}`);
  console.log("Starting a new worker");
  cluster.fork();
});
