## le port: http://localhost:8020/

docker-compose up -d
docker exec -it puzzle_container bash
//to clear docker: docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -aq)
docker volume prune -f

## pour chaque lancement de serveur 
    docker-compose up -d
    docker attach puzzle_container
    ng serve --host 0.0.0.0 &
    //(ng serve ) pour la premiere fois
    


## 1. Initialisation du dépôt Git 
mkdir puzzle_game
cd puzzle_game
git init

## 2. Configuration du front-end Angular
npm install -g @angular/cli
ng new puzzle_frontend --routing --style=scss

## 3. Configuration du back-end Symfony
symfony new puzzle_backend 
symfony composer require symfony/orm-pack
symfony composer require --dev symfony/maker-bundle
symfony composer require symfony/serializer-pack
// pour que ne pas oublier d'ajouter les style d'ecriture qu'on a fait en tp

## 4. Création des entités
symfony console make:entity Utilisateur
symfony console make:entity Puzzle
symfony console make:entity Partie


symfony console make:controller GameController




## 5. Création des migrations et mise à jour de la base de données
symfony console make:migration
symfony console doctrine:migrations:migrate\

