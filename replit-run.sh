#!/usr/bin/env bash
set -e

# 1) Installer et build le frontend
cd frontend
npm install
npm run build

# 2) Installer backend et démarrer le serveur
cd ../backend
npm install
node server.js
npm install
npm run build

# 2) Installer backend et démarrer le serveur
cd ../backend
npm install
node server.js
