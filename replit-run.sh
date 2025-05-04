#!/usr/bin/env bash
set -e

# 1) Installer et builder le frontend + back
npm install
npm run build

# 2) Lancer le back compilé
npm start
