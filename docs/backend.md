# Backend

Ce document décrit l'état actuel du backend et les premiers choix techniques.

## Objectif

Le backend a pour rôle de servir les données nécessaires à l'exploration des artistes, des genres musicaux et des collaborations.

La première version reste volontairement simple pour valider rapidement :

- la structure des données
- le flux API
- l'accès à la base
- la future recherche côté interface

## Stack backend

- PostgreSQL pour le stockage
- Prisma pour l'accès aux données
- Routes API Next.js pour exposer les premiers endpoints
- Docker Compose pour le service de base de données local

## Modèle de données actuel

Le schéma Prisma contient actuellement trois modèles :

- `Artist`
- `Genre`
- `Collaboration`

### Artist

Représente un artiste dans le graphe.

Champs principaux :

- `id`
- `name`
- `slug`
- `primaryGenreId`

### Genre

Représente un univers musical principal.

Champs principaux :

- `id`
- `name`
- `color`

### Collaboration

Représente un lien entre deux artistes.

Champs principaux :

- `id`
- `sourceArtistId`
- `targetArtistId`
- `contextLabel`

## Limites actuelles

Le modèle actuel simplifie volontairement la réalité.

En particulier :

- une collaboration n'est pas encore rattachée à un morceau
- le lien est modélisé de manière orientée
- les sources externes de données ne sont pas encore intégrées

Ce choix permet de valider rapidement la recherche et la structure générale avant d'enrichir le modèle.

## Organisation actuelle

- `src/lib/prisma.ts` : instance Prisma partagée
- `src/server/artists/artist.repository.ts` : accès aux données liées aux artistes
- `src/app/api/artists/search/route.ts` : endpoint de recherche

## Endpoint disponible

### `GET /api/artists/search?q=...`

Retourne une liste d'artistes correspondant au nom ou au slug recherché.

Exemple :

`/api/artists/search?q=sch`

## Données de démonstration

Un seed minimal est disponible pour injecter quelques genres et artistes de test :

- SCH
- Ninho
- Damso
- Burna Boy

Commande :

`npm run db:seed`

## Évolutions prévues

Les prochaines évolutions backend envisagées sont :

- ajout d'un modèle `Track`
- ajout de données de collaborations réelles
- ajout d'un endpoint détaillé pour un artiste
- préparation d'un format de réponse adapté au graphe frontend
