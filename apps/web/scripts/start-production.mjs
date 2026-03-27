#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const cwd = process.cwd();
const port = process.env.PORT ?? '5000';
const hostname = process.env.HOSTNAME ?? '0.0.0.0';
const useStandalone = process.env.PBT_PING_USE_STANDALONE === '1';
const standaloneCandidates = [
  resolve(cwd, '.next/standalone/apps/web/server.js'),
  resolve(cwd, '.next/standalone/server.js'),
];
const standaloneEntry = standaloneCandidates.find((c) => existsSync(c));

const child =
  useStandalone && standaloneEntry
    ? spawn(process.execPath, [standaloneEntry], {
        cwd,
        stdio: 'inherit',
        env: { ...process.env, PORT: port, HOSTNAME: hostname },
      })
    : spawn(
        process.platform === 'win32' ? 'npx.cmd' : 'npx',
        ['next', 'start', '--port', port, '--hostname', hostname],
        { cwd, stdio: 'inherit', env: process.env },
      );

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

for (const event of ['SIGINT', 'SIGTERM']) {
  process.on(event, () => {
    if (!child.killed) child.kill(event);
  });
}
