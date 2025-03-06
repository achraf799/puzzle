# L3 Informatique -- Framework Web 2

## Adaptation du fichier docker-compose.yml

Il faut modifier les lignes suivantes dans docker-compose.yml :

- USERNAME est votre nom d'utilisateur
- UID votre identifiant utilisateur
- MAIL
- NAME

On obtient les deux premières informations en exécutant la commande "id" dans un terminal du système hôte.

Exemple: 

    args:
      USERNAME: frederic.loulergue
      UID: 11688
      MAIL: frederic.loulergue@univ-orleans.fr
      NAME: "Frédéric Loulergue"

Il est également conseillé de personnaliser le nom du container. Dans cette version (voir docker-compose.yml), j'ai appelé le container : container-fw2-tp-bidule

## Démarrage

L'utilisation est:

    docker-compose build
    docker-compose up -d
    docker attach puzzle_container
    sudo apt update


## pour chaque lancement de serveur
    docker-compose up -d
    docker attach puzzle_container

## Creation de projet
ng new puzzle
ng serve: pour demarer le serveur