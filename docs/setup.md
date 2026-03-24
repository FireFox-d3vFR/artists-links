# Mise en place

Ce document explique comment démarrer le projet en local.

## Prérequis

- Node.js 20+
- npm
- Docker
- Docker Compose

## Installation

Installer les dépendances :
`npm install`

Copier le fichier d'environnement :
`cp .env.example .env`

Démarrer PostgreSQL :
`docker compose up -d postgres`

Appliquer les migrations Prisma :
`npx prisma migrate dev`

Démarrer le serveur de développement :
`npm run dev`

## Remarques

- Le service PostgreSQL est défini dans `docker-compose.yml`.
- Les variables d'environnement locales sont stockées dans `.env`.
- Le fichier `.env.example` est versionné pour documenter les variables attendues.
