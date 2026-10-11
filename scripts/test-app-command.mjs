import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
const config = JSON.parse(await readFile('/tmp/aljalal-test-config.json', 'utf8'));
const args = process.argv.slice(2);
const env = { ...process.env, ...config };
if (args[0] === '--without-jwt-secret') {
  args.shift();
  delete env.JWT_SECRET;
}
const child = spawn(args[0], args.slice(1), { stdio: 'inherit', env });
child.on('exit', code => { process.exitCode = code ?? 1; });
