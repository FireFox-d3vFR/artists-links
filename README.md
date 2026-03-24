# Artists Links

Artists Links est une application web qui a pour objectif d'explorer les collaborations entre artistes sous forme de graphe musical.

L'idée est de rechercher un artiste, visualiser ses featuring et collaborations, puis naviguer de noeud en noeud pour mettre en évidence des proximités musicales, des artistes en commun et des passerelles entre genres.

## État du projet

Le projet est en phase de mise en place.

À ce stade, les éléments suivants sont en place :

- socle `Next.js + TypeScript`
- base PostgreSQL via `Docker Compose`
- ORM `Prisma`
- schéma initial pour les artistes, genres et collaborations
- seed de démonstration
- première route API de recherche d'artistes

## Stack technique

- Next.js
- TypeScript
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Docker Compose

## Démarrage rapide

Installer les dépendances :

`npm install`

Copier le fichier d'environnement :

`cp .env.example .env`

Démarrer PostgreSQL :

`docker compose up -d postgres`

Appliquer les migrations Prisma :

`npx prisma migrate dev`

Injecter les données de démonstration :

`npm run db:seed`

Démarrer le serveur de développement :

`npm run dev`

## Commandes utiles

Lancer le serveur de développement :

`npm run dev`

Vérifier le lint :

`npm run lint`

Générer le client Prisma :

`npx prisma generate`

Relancer les migrations en développement :

`npx prisma migrate dev`

Rejouer le seed :

`npm run db:seed`

## Documentation

- `docs/setup.md` : mise en place du projet en local
- `docs/technical-rules.md` : conventions et règles techniques

## Direction produit

Les prochaines étapes prévues sont :

- création de l'interface de recherche
- affichage des résultats côté frontend
- intégration d'un graphe interactif
- enrichissement progressif du modèle de données

## Remarques

Le projet privilégie pour l'instant une approche simple et lisible, avec des fichiers courts, une séparation claire des responsabilités, et une documentation légère mais utile.
