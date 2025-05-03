# I - Introduction à ExpressJS
## Exercice 1:Créer un serveur ExpressJS simple
Créez un serveur ExpressJS qui répond "Hello World" sur la route principale et affiche la date et l'heure actuelles sur la route "/date".


 ### Démarrage et arrêt du serveur:
 ``` bash command 
 node app.js
 ```
### URL pour tester le projet : http://localhost:3000/

# Serveur ExpressJS affichant "Welcome to Home Page"
![welcome](https://github.com/user-attachments/assets/2a14e51a-1ae8-4bd0-8393-33a0df9b10ce)


# Affichage de la date actuelle sur la route /date
La page située à la route "/date" affiche la date et l'heure actuelles

![date](https://github.com/user-attachments/assets/f8955b52-0267-4e18-a1a0-e0c8563333a0)




# Exercice 2: Configuration d'un projet ExpressJS
Créez un projet ExpressJS complet avec la structure de répertoires recommandée et configurez-le pour servir des fichiers statiques et gérer différentes routes.

 ### Démarrage et arrêt du serveur:
 ``` bash command 
 node app.js
 ```
### URL de test : http://localhost:3000/users
# Organisation du projet avec gestion des routes et fichiers statiques

![welcome user](https://github.com/user-attachments/assets/528e3cfd-2c94-4bcf-aa1b-02f998d8ee77)



# II - Routage avec ExpressJS
## Exercice 1: Créer un ensemble de routes pour une API de gestion de tâches
Exercice 1: Créer un ensemble de routes pour une API de gestion de tâches
Créez une API RESTful pour gérer une liste de tâches avec les routes suivantes :

GET /tasks - Récupérer toutes les tâches

GET /tasks/:id - Récupérer une tâche spécifique

POST /tasks - Créer une nouvelle tâche

PUT /tasks/:id - Mettre à jour une tâche existante

DELETE /tasks/:id - Supprimer une tâche

### URL de test : http://localhost:3000/tasks-page
# Affichage de l'interface de gestion des tâches

![tasks](https://github.com/user-attachments/assets/75e99039-e86e-4d83-b537-70a640f7d3b1)


## Exercice 2: Implémenter des routes paramétrées
Créez une API pour un blog avec des routes paramétrées :

GET /posts/:year/:month? - Récupérer les articles d'une année et optionnellement d'un mois spécifique

GET /categories/:categoryName/posts - Récupérer les articles d'une catégorie spécifique

### URL de test : http://localhost:3000/blog-page

### API RESTful avec routes paramétrées pour un blog

![blogs](https://github.com/user-attachments/assets/6f8e4c2c-7d53-4eb9-b92f-d184a7f38a63)


## Exercice 3: Organiser une application avec des routeurs modulaires
Réorganisez une application Express existante en utilisant des routeurs modulaires pour différentes ressources (utilisateurs, produits, commandes, etc.).

### URL de test : http://localhost:3000/admin-dashboard

## Interface de gestion des produits (routeur : /produits)
![dashbord-produit](https://github.com/user-attachments/assets/670edb89-b4b4-4c63-867f-8594e774bfc7)


## Interface de gestion des utilisateurs (routeur : /utilisateurs)
![dashbord-users](https://github.com/user-attachments/assets/894e5ed1-b68e-454a-9e29-e8b3c6cdcbde)


## Interface de gestion des commandes (routeur : /commandes)
![dashbor-commandes](https://github.com/user-attachments/assets/578f9c16-1f53-4f89-b71c-71863fe462e7)



# III - Les Middlewares dans ExpressJS
## Exercice 1: Créer un middleware de logging personnalisé 
Créez un middleware qui enregistre les détails de chaque requête (méthode, URL, heure, adresse IP) dans un fichier de log.

# code
![logger-code](https://github.com/user-attachments/assets/61e3956c-ff67-4756-832c-4cb2ff76afd8)


# logs 
![logs](https://github.com/user-attachments/assets/cf1e4953-6fad-4d91-9307-f7cd7b9757c2)



## Exercice 2: Implémenter un middleware d'authentification simple
Créez un middleware qui vérifie si une requête contient un token valide dans les en-têtes et refuse l'accès si ce n'est pas le cas.
### Tester avec Thunder Client for VS Code
![download](https://github.com/user-attachments/assets/72bbc295-7bd3-4f5d-aba6-bb6fbf1d0006)

#### Étape 1 : Obtenir un token (Login)
### Méthode : POST
### URL : http://localhost:3000/login
![Obtenir un token](https://github.com/user-attachments/assets/23ff7787-2406-4dc8-b6c3-20f36af38db6)



### Étape 2 : Accéder à une route protégée avec un token valide
### Méthode: GET
### 👉 URL: http://localhost:3000/protected 
 ![acces to protect route with token](https://github.com/user-attachments/assets/89aff08b-915e-4fb4-8497-f26efad75b5e)



 ### Étape 3 : Accéder à une route protégée sans token
 ### Méthode: GET
 ### 👉 URL: http://localhost:3000/protected 
![acces to protect route with no token](https://github.com/user-attachments/assets/a26e63ac-65f1-4239-bc32-359628185ff8)

 
### Étape 4 : Utiliser un token invalide
![invalid token test](https://github.com/user-attachments/assets/6fa961f0-515e-40c7-8a73-dfe45eed09df)


# IV - Gestion des requêtes et réponses
## Exercice 1 : Créer un formulaire et traiter sa soumission avec ExpressJS
Créez une application Express qui affiche un formulaire d'inscription et traite sa soumission. Le formulaire doit inclure des champs pour le nom, l'email et le mot de passe. Validez les données soumises et affichez un message de confirmation.

 ### URL : http://localhost:3000/inscription
 ## Formulaire d’inscription
![signin page](https://github.com/user-attachments/assets/c35d263e-0530-4873-b497-a0e3c690e98e)

 
## Erreur de confirmation de mot de passe
![signin password errro](https://github.com/user-attachments/assets/7326b433-3d0c-44a1-8f5b-83f9507542e9)

 
 ## Page de confirmation réussie
![signin-confimation](https://github.com/user-attachments/assets/78a43aa2-7fda-47d8-ac4b-04c3f1e39126)

 ## Exercice 2 : Implémenter un système d'upload de fichiers
Créez une application qui permet aux utilisateurs d'uploader des images. Limitez les types de fichiers acceptés aux images (JPEG, PNG, GIF) et la taille maximale à 5MB. Affichez les images uploadées dans une galerie.
 ### URL : http://localhost:3000/upload
 ## Interface de la galerie d'images
![upload images](https://github.com/user-attachments/assets/b8fe3c6d-d6d1-48a1-ad57-82eded29b928)


 ## Exercice 3 : Créer une API qui répond en différents formats
 Créez une API qui peut renvoyer des données dans différents formats (JSON, XML, HTML) en fonction de l'en-tête Accept envoyé par le client. Utilisez res.format() pour gérer les différents formats.
  ### URL : http://localhost:3000/api/users

  ## Résultat HTML - Liste des utilisateurs
  
  ![users show page](https://github.com/user-attachments/assets/599fc1da-8b41-47ba-b16a-4a5a0b48e7a5)

  ## Résultat HTML - Détail d'utilisateur
  ![user details](https://github.com/user-attachments/assets/c1f50583-e79c-43e7-8e24-c208958853a4)


  ## Résultat JSON
  ![users-json](https://github.com/user-attachments/assets/fa6f14ae-0516-4aa5-9f76-d03b519318d3)

  
  ## Résultat XML
  ![user-xml](https://github.com/user-attachments/assets/bd6ff9dd-5d46-4a77-89cb-2f417071d643)









 















