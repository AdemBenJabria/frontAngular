# Authentification Angular et Node.js avec JWT

Dans le cadre du projet Assignments, nous avons mis en œuvre l'authentification des utilisateurs pour une application Angular en utilisant Node.js, Express et les JSON Web Tokens (JWT). Notre objectif était de garantir une communication sécurisée entre le client et le serveur, tout en offrant une expérience utilisateur fluide et sécurisée en utilisant des bibliothèques et des services spécifiques à Angular et en tirant parti des avantages de JWT pour l'authentification et l'autorisation.


## Aperçu

Cette solution fournit un moyen sécurisé d'authentifier les utilisateurs dans une application Angular en utilisant les JWT. Le côté client gère l'authentification en utilisant les services Angular et les Observables RxJS, tandis que le côté serveur est construit avec Node.js, Express et MongoDB pour stocker les informations des utilisateurs.


Les fonctionnalités mises en œuvre comprennent :

 - Inscription des utilisateurs
 - Connexion des utilisateurs
 - consulter/ajouter/modifier/supprimer un devoir
 - Récupération du prénom de l'utilisateur connecté pour y ajouter dynamiquement le nom de l'auteur
 - Utilisation de async/await pour ajouter des devoirs

## Problème

Le problème initial était de récupérer le prénom (et d'autres informations utilisateur) de l'utilisateur connecté côté client, alors que seul l'ID de l'utilisateur était accessible.

 ## Solution

Pour résoudre ce problème, nous avons effectué les étapes suivantes :

- Inclure les informations utilisateur requises dans le token JWT côté serveur lors de la création du token.

- Extraire correctement les informations utilisateur du token JWT dans le service d'authentification Angular (auth.service.ts).

- Utiliser les informations utilisateur extraites (comme le prénom) dans le composant addAssignment.component.ts.

De plus, nous avons également montré comment utiliser async/await dans la méthode addAssignment() pour attendre que l'assignement soit ajouté avant de rediriger l'utilisateur vers la page des assignements.

  
## Conclusion

En conclusion, l'utilisation de JWT (JSON Web Tokens) dans le projet Assignments avec Angular améliore considérablement la sécurité et l'efficacité des communications client-serveur. Grâce à leur format compact et leur capacité à être cryptés, les JWT facilitent l'authentification et l'autorisation sécurisées des utilisateurs sans compromettre leurs données personnelles.
En somme, l'adoption de JWT dans le projet Assignments a non seulement renforcé la sécurité et la confidentialité des informations sensibles, mais a également permis d'améliorer l'expérience utilisateur en offrant une authentification rapide et fiable.