import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
const config = JSON.parse(await readFile('/tmp/aljalal-test-config.json', 'utf8'));
const child = spawn(process.argv[2], process.argv.slice(3), { stdio: 'inherit', env: { ...process.env, ...config } });
child.on('exit', code => { process.exitCode = code ?? 1; });
