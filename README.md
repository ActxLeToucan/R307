# R307

## Développement
### Configuration de l'environnement
Dupliquer le fichier [`.env.dist`](.env.dist) en `.env`.\
Renseigner les variables d'environnement manquantes.

Dupliquer le fichier [`directus/docker-compose.yml.dist`](directus/docker-compose.yml.dist) en `directus/docker-compose.yml`.\
Renseigner les variables d'environnement manquantes.

### Installation du projet en local
Installer les dépendances du projet
```npm ci```

Lancer le serveur directus et s'assurer qu'il est bien accessible avant de continuer
```npm run directus```

Appliquer le schéma des collections directus
```npm run directus:snapshot```

Redémarrer le serveur directus.
```npm run directus:restart```

### Lancement du projet
Exécuter la commande ```npm run directus```.

Exécuter la commande ```npm run dev```.\
L'application va tourner en mode watch, et sera accessible à l'adresse `{HOST}:{PORT}` (cf. [.env](.env)).

## Déploiement
### Build simple
Exécuter la commande ```npm run build``` pour générer le build de l'application.\
Pour lancer le serveur, exécutez la commande ```npm run start```.

### Docker
Dupliquer le fichier [`docker-compose.yml.dist`](docker-compose.yml.dist), le renommer en `docker-compose.yml`.\
Le modifier si besoin pour obtenir la configuration souhaitée.

Exécuter la commande ```npm run prod``` pour construire et lancer l'image docker de l'application.

#### Application de la snapshot Directus
##### Méthode 1 : API (recommandée)
Le token du compte admin est nécessaire pour cette méthode.
1. Requête : `POST /schema/diff` avec dans le body (en form-data) :
    - `file` : snapshot.yaml
2. Copier l'objet `data` de la réponse
3. Requête : `POST /schema/apply` avec dans le body (en raw) :
    - `application/json` : le résultat de la requête précédente

##### Méthode 2 : CLI
Exécuter la commande ```docker compose exec directus npx directus schema apply --yes ./snapshot.yaml``` puis relancer directus.

## Documentation
La documentation (OpenAPI) est disponible après le lancement du serveur.\
Une documentation existe pour chaque version de l'API à l'adresse `{HOST}:{PORT}/{version}/docs`.

Versions de l'API disponibles :
- v1
