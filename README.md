# Argent Bank - Projet React

Argent Bank est une application web complète et responsive développée avec React. Ce projet fictif a été créé dans le cadre d'une formation en tant qu'intégrateur web.

## Fonctionnalités

- L'utilisateur peut visiter la page d'accueil.
- L'utilisateur peut se connecter au système.
- L'utilisateur peut se déconnecter du système.
- L'utilisateur ne peut voir les informations relatives à son propre profil qu'après s'être connecté avec succès.
- L’utilisateur ne peut pas modifier son nom ni son prénom, mais il peut modifier son pseudo.

## Prérequis

**Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre système :**

- Node.js
- npm (Gestionnaire de paquets Node.js)
- MongoDB Compass

## Installation

### Étapes d'installation

1. *Clonez ce dépôt depuis GitHub* :

git clone https://github.com/Fl0jfk/OC-ArgentBank.git

2. *Installez les dépendances en exécutant* :

npm install

3. *Assurez-vous que MongoDB Compass est en cours d'exécution avec l'URL suivante pour accéder à la base de données en local : `mongodb://localhost:27017`.*

4. *Accéder au serveur en éxécutant :*
npm run dev:server

5. *Ajouter les deux utilisateurs dans la base de données :*

npm run populate-db


## Utilisation

**Pour lancer l'application, suivez les étapes suivantes :**

1. *Dans le terminal , lancez le serveur avec la commande :*

npm run dev:server

L'application devrait maintenant être accessible.

Pour obtenir des informations détaillées sur les endpoints de l'API, consultez le fichier Swagger fourni dans le backend. Vous y trouverez les routes, les descriptions des endpoints et les codes de réponse correspondants.
