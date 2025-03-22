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

    sudo docker compose build
    sudo docker compose up -d
    sudo docker attach puzzle_container


symfony new backend 
cd backend
symfony composer require symfony/orm-pack 
symfony composer require --dev symfony/maker-bundle
 symfony composer require symfony/serializer-pack 
 // pour que ne pas oublier d'ajouter les style d'ecriture qu'on a fait en tp

 docker compose exec framework-web-2 sh  # Open a shell in the container
apk add --no-cache php82-pdo_pgsql php82-pgsql
exit


symfony console doctrine:database:create
symfony console make:migration
symfony console doctrine:migrations:migrate


docker exec -u root -it puzzle_container sh




sudo -u postgres psql
CREATE USER achraf WITH PASSWORD 'password';


host    all             all             0.0.0.0/0               md5
host    all             all             ::/0                    md5
host    all             all             172.17.0.0/16            md5
host    creacosm    achraf    192.168.1.64/32    scram-sha-256
host    all             all             172.26.0.0/16           md5



##  ----------------------------README COMMENCE ICI------------------------------------

# 0.Docker:
docker compose build
docker compose up -d
docker attach puzzle_container

# 1.Github:
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/achraf799/puzzle.git
git push -u origin main
# 2.Initialisation de backend:
symfony new backend 
cd backend
symfony composer require symfony/orm-pack 
symfony composer require --dev symfony/maker-bundle
symfony composer require symfony/serializer-pack 
 // pour que ne pas oublier d'ajouter les style d'ecriture qu'on a fait en tp


# 3.Initialisation de BDD Postres:
symfony console doctrine:database:create
symfony console make:migration
symfony console doctrine:migrations:migrate

# 4.Initialisation de frontend:
ng new frontend --routing --style=scss
npm install

# 5.Créer les entités :
symfony console make:entity Puzzle
symfony console make:entity Partie
symfony console make:migration
symfony console doctrine:migrations:migrate

# 6.Creation des controlleurs
symfony console make:controller PartieController


# 7.Frontend (Angular)
2.1 - Créer les composants

ng generate component components/menu
ng generate component components/game
ng generate component components/score

ng generate service services/game
