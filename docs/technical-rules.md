# Règles techniques

Ce document définit les règles techniques de base du projet.

## Principes

- Favoriser des fichiers courts et ciblés.
- Séparer clairement l'interface, la logique métier et l'accès aux données.
- Éviter les abstractions trop tôt.
- Préférer la lisibilité à l'optimisation prématurée.
- Ajouter des commentaires quand le contexte ou l'intention n'est pas évident.

## Organisation du code

- `src/app` contient les routes et layouts Next.js.
- `src/components` contient les composants UI réutilisables.
- `src/features` contient les fonctionnalités métier par domaine.
- `src/lib` contient les utilitaires transverses et la configuration partagée.
- `src/server` contient la logique serveur et l'accès aux données.
- `src/types` contient les types partagés.

## Conventions

- Le code source est rédigé en anglais.
- La documentation projet est rédigée en français.
- Les commentaires dans le code sont rédigés en français.
- Un composant ou module ne doit pas mélanger plusieurs responsabilités.
- Toute logique complexe doit être extraite hors du composant d'affichage si possible.

## Données et base

- Prisma est utilisé comme ORM.
- PostgreSQL est lancé localement avec Docker Compose.
- Les variables locales sont stockées dans `.env`.
- Le fichier `.env.example` documente les variables attendues et peut être versionné.

## Qualité

- ESLint doit rester actif sur le projet.
- Les changements doivent rester simples à relire.
- Une fonctionnalité doit être découpée en petites étapes validables.
