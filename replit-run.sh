#!/usr/bin/env bash
set -e

# 1) Installer toutes les dépendances
npm install

# 2) Builder le frontend + bundle le backend
npm run build

# 3) Démarrer le serveur compilé
npm start
