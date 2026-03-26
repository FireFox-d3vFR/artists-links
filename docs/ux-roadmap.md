# Feuille de route UX

Ce document décrit la direction UX cible du projet et sert de trame pour les prochaines itérations.

## Vision produit

L'application doit proposer une expérience d'exploration musicale centrée sur un graphe interactif.

Le parcours utilisateur idéal est le suivant :

- l'utilisateur arrive sur une page d'accueil simple et marquante
- il recherche un artiste via une barre de recherche centrale
- après sélection, il bascule vers une vue d'exploration centrée sur le graphe
- il clique sur des artistes pour consulter leur contexte sans perdre la vue d'ensemble
- il peut décider d'explorer un autre artiste comme nouveau point de départ

L'objectif est de faire ressentir une navigation fluide entre artistes, collaborations et univers musicaux.

## Principes UX

- Mettre le graphe au centre de l'expérience après la recherche.
- Conserver un point d'accès permanent à la recherche.
- Éviter de surcharger l'écran avec trop d'informations en même temps.
- Afficher les détails contextuels dans un espace secondaire, sans casser l'exploration.
- Favoriser une interface lisible, sobre et immersive.
- Ajouter des animations seulement si elles renforcent la compréhension ou la sensation de fluidité.

## Parcours principal

### 1. Accueil

L'utilisateur voit :

- le titre du projet
- une barre de recherche centrale
- une identité visuelle forte mais épurée

Objectif :

- comprendre immédiatement la proposition du produit
- lancer une recherche rapidement

### 2. Résultat de recherche

Après sélection d'un artiste :

- le graphe devient l'élément principal de la page
- la recherche reste disponible en haut, dans une barre fixe ou semi-fixe
- l'utilisateur peut continuer à naviguer sans revenir à l'écran initial

Objectif :

- passer d'une logique de recherche à une logique d'exploration

### 3. Interaction avec le graphe

Le graphe doit permettre :

- de visualiser les artistes liés
- de déplacer les noeuds
- de zoomer et dézoomer
- de cliquer sur un artiste pour ouvrir son contexte

Objectif :

- rendre les collaborations lisibles
- encourager l'exploration de proche en proche

### 4. Interaction avec un artiste

Un clic sur un artiste ouvre un modal.

Deux cas sont distingués :

- artiste principal recherché
- artiste collaborateur

#### Artiste principal

Le modal doit pouvoir afficher à terme :

- nom
- genre principal
- informations générales
- sons populaires
- discographie
- informations d'identité comme la nationalité

#### Artiste collaborateur

Le modal doit afficher en priorité :

- les collaborations ou morceaux en commun avec l'artiste central
- le contexte de la relation
- une action claire pour explorer cet artiste comme nouveau centre

Objectif :

- garder un niveau d'information adapté au rôle de l'artiste dans le graphe

## Structure cible des écrans

### Écran d'accueil

- grand titre
- recherche centrale
- direction artistique premium et minimaliste

### Vue d'exploration

- barre haute avec titre et recherche
- graphe en zone principale
- zone secondaire pour aides ou informations légères
- modal pour les détails d'artiste

### Modal artiste

- en-tête clair avec nom et identité visuelle
- contenu court et structuré
- action principale : explorer cet artiste

## Choix UX recommandés

## Priorité actuelle

Pour la prochaine itération UX, la priorité recommandée est :

- recherche centrale sur l'accueil
- bascule vers une vue dédiée au graphe après sélection
- ouverture d'un modal au clic sur un artiste
- bouton pour recentrer l'exploration sur un autre artiste

## Choix d'implémentation

- Ne pas surcharger la première version des modals.
- Commencer par un contenu simple mais cohérent.
- Faire du graphe la zone principale dès la première vraie refonte UX.
- Garder les animations simples au départ.
- Réserver une intégration plus poussée de GSAP à une phase ultérieure.

## Direction visuelle

La direction visuelle recherchée est :

- sobre
- premium
- lisible
- moderne
- avec une sensation de fluidité

Références d'intention :

- interface épurée
- hiérarchie visuelle nette
- transitions douces
- inspiration minimaliste de type produit Apple, sans tomber dans l'effet décoratif gratuit

## Backlog UX

### Bloc UX 1

- Repenser l'écran d'accueil autour d'une recherche purement centrale
- Concevoir une vue d'exploration dédiée après sélection
- Déplacer le graphe au centre de l'expérience
- Garder la recherche accessible dans la vue d'exploration

### Bloc UX 2

- Ajouter un modal pour l'artiste principal
- Ajouter un modal pour un collaborateur
- Introduire l'action `Explorer cet artiste`

### Bloc UX 3

- Améliorer la hiérarchie visuelle du graphe
- Ajouter une légende ou des repères de lecture
- Travailler les états de survol, clic et sélection

### Bloc UX 4

- Ajouter des animations plus avancées
- Étudier l'apport éventuel de GSAP
- Renforcer l'identité visuelle globale du produit

## Remarque

Cette feuille de route UX doit guider les prochaines décisions d'interface.

Elle n'a pas vocation à figer chaque détail visuel, mais à conserver une direction produit cohérente pendant le développement.
