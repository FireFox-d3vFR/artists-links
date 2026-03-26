# Suivi du projet

Ce document suit l'avancement des blocs de travail du projet.

Il sert à garder une vision simple de ce qui est terminé, en cours ou encore à traiter, sans remplacer la documentation produit ou technique.

## Bloc Fondation

### Fondation 1 - Socle projet
- Statut : fait
- Objectif : mettre en place le projet Next.js, Prisma, PostgreSQL et Docker Compose
- Validation : application lancée en local avec environnement stable

### Fondation 2 - Backend initial
- Statut : fait
- Objectif : exposer une recherche d'artistes et un détail d'artiste
- Validation : endpoints de recherche et de détail disponibles

### Fondation 3 - Données de démonstration
- Statut : fait
- Objectif : injecter un jeu de données local pour tester le flux produit
- Validation : seed opérationnel avec artistes, genres et collaborations

## Bloc Exploration V1

### Exploration 1 - Recherche frontend
- Statut : fait
- Objectif : permettre la recherche d'un artiste depuis l'interface
- Validation : résultats affichés côté frontend

### Exploration 2 - Fiche artiste
- Statut : fait
- Objectif : afficher le détail d'un artiste sélectionné
- Validation : panneau de détail relié à l'API

### Exploration 3 - Navigation entre artistes
- Statut : fait
- Objectif : permettre de naviguer d'un artiste à un autre
- Validation : clic sur une collaboration recharge l'artiste correspondant

### Exploration 4 - Graphe interactif
- Statut : fait
- Objectif : afficher les collaborations directes sous forme de graphe
- Validation : graphe affiché avec noeuds cliquables

## Bloc UX 1

### UX 1.1 - Séparation landing / exploration
- Statut : fait
- Objectif : distinguer clairement l'écran d'accueil et la vue d'exploration
- Validation : landing dédiée et vue exploration dédiée

### UX 1.2 - Graphe principal
- Statut : fait
- Objectif : repositionner le graphe comme élément principal de la vue d'exploration
- Validation : graphe central et panneau latéral séparé

### UX 1.3 - Finitions de la vue exploration
- Statut : en cours
- Objectif : améliorer la hiérarchie visuelle entre header, graphe et panneau latéral
- Validation : vue exploration plus compacte, plus lisible et mieux équilibrée

## Bloc UX 2

### UX 2.1 - Modal artiste
- Statut : à faire
- Objectif : remplacer le panneau latéral par une logique de modal
- Validation : clic sur un artiste ouvre un modal de détail

### UX 2.2 - Modal collaborateur
- Statut : à faire
- Objectif : afficher le contexte de relation avec l'artiste principal
- Validation : le modal d'un collaborateur présente les liens communs et une action d'exploration

## Bloc Data 2

### Data 2.1 - Enrichissement du modèle
- Statut : à faire
- Objectif : introduire les morceaux ou titres comme support réel des collaborations
- Validation : les relations entre artistes peuvent être rattachées à des morceaux

### Data 2.2 - Enrichissement des détails artiste
- Statut : à faire
- Objectif : préparer les informations nécessaires aux futurs modals
- Validation : structure compatible avec infos artiste, morceaux communs et exploration avancée
