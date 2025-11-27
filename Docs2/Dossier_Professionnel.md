# Dossier Professionnel

_Page de garde (vide)_

- Projet : CCP
- Auteur :
- Période :

---

## Sommaire

- [Contexte & Objectifs](#contexte--objectifs)
- [ProjetCCP1 — Brouillon et Code](#projetccp1---brouillon-et-code)
  - [Brouillon (TXT)](#brouillon-txt)
  - [index.html](#indexhtml)
  - [style.css](#stylecss)
  - [script.js](#scriptjs)
- [Volunteer Platform — Projet complet](#volunteer-platform---projet-complet)
  - [Readme & Permissions](#readme--permissions)
  - [Architecture & Composants](#architecture--composants)
  - [Extraits de code importants](#extraits-de-code-importants)
- [Instructions d'exécution & Tests](#instructions-dexécution--tests)
- [Annexes](#annexes)

---

## Contexte & Objectifs

Contenu extrait du README du projet `volunteer-platform` et du brouillon fourni dans `ProjetCCP1`.

> Voir la section "Readme & Permissions" pour le texte complet du README.

---

## ProjetCCP1 — Brouillon et Code

### Brouillon (TXT)

Fichier : `ProjetCCP1/1-dossier_professionnel_version_traitement_de_texte (1)(1).txt`

```
Nom de naissance	?	Entrez votre nom de naissance ici.
Nom d�usage	?	Entrez votre nom d�usage ici.
Pr�nom	?	Entrez votre pr�nom ici.
Adresse	?	Entrez votre adresse ici.

Titre professionnel vis�

D�veloppeur Web / Web Mobile

Modalit� d�acc�s�:

?	Parcours de formation
?	Validation des Acquis de l�Exp�rience (VAE)

Pr�sentation du dossier

Le dossier professionnel (DP) constitue un �l�ment du syst�me de validation du titre professionnel. Ce titre est d�livr� par le Minist�re charg� de l�emploi.
Le DP appartient au candidat. Il le conserve, l�actualise durant son parcours et le pr�sente obligatoirement � chaque session d�examen.
Pour r�diger le DP, le candidat peut �tre aid� par un formateur ou par un accompagnateur VAE.

... (contenu complet du brouillon ci‑dessus) ...

```

Remplacez les champs marqués "Cliquez ici" par vos expériences et preuves (exemples de pratique, contextes, périodes, signatures).

---

### index.html

Fichier : `ProjetCCP1/index.html`

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Découvrez les meilleurs événements à venir près de chez vous."/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <title>eventsPortal</title>
  </head>
  <body>
    <header>
        <div class="eventsTitle">
        <h1>Les évènements</h1>
        <img class="darkModeImage" src="https://res.cloudinary.com/dwkyezu2u/image/upload/v1748013892/pngegg_1_uywwwa.png" alt="Mode Sombre">
     </div>
    </header>
    </main>
    <div id="eventsContainer">
       <div id="scrollEventsContainer">
       </div>
    </div>
       <div id="eventModal">
        <div id=modal>
            <div id="closeModal">X</div>
        <h2 id="modalTitle"></h2><br>
        <p id="modalDate"></p><br>
        <p id="modalAdress"></p><br>
        <p id="modalDescription"></p> <br>
        <p>Accéder à l'événement : <a id="modalUrl" target="_blank"></a></p>
        </div>
      # Dossier Professionnel (modèle CCP)

      _Page de garde (champs vides)_

      - Projet : CCP2
      - Auteur :
      - Période :

      ---

      ## Sommaire

      - Présentation du projet
      - Activité‑type 1 : Développer la partie front‑end (Exemple n°1)
      - Activité‑type 2 : Développer la partie back‑end (Exemple n°1)
      - Titres, diplômes et attestations
      - Déclaration sur l'honneur
      - Annexes (code, scripts, base de données)

      ---

      ## Présentation du projet

      Projet principal : `volunteer-platform` — plateforme web permettant aux bénévoles de postuler à des missions créées par des associations. Back‑end Node.js/Express avec MariaDB. Front‑end prototype : `ProjetCCP1` — portail d'événements consommant une API publique.

      Objectifs pédagogiques et professionnels :
      - Concevoir et développer une application web complète (front + back).
      - Mettre en place une API REST sécurisée (authentification, autorisation).
      - Modéliser une base de données relationnelle et assurer l'intégrité des données.

      ---

      ## Activité‑type 1 — Développer la partie front‑end d'une application web ou web mobile sécurisée

      Exemple n°1 (tiré de `ProjetCCP1`)

      1) Description des tâches et conditions :

      Développement complet du prototype front‑end d’un portail d’événements : réalisation de la page d’accueil affichant une liste défilante d’événements, création de cartes événement, implémentation d’une modale de détail, et d’un espace « Mon planning » où l’utilisateur peut ajouter/retirer des événements.

      Travail réalisé : conception HTML structurelle, mise en forme CSS responsive, interactions JavaScript (fetch API vers une API publique d’événements, manipulation du DOM, gestion du stockage local via `localStorage`, gestion d’un mode sombre).

      2) Moyens utilisés :

      - Langages & outils : HTML5, CSS3, JavaScript (ES6), Fetch API, navigateur web pour tests.
      - Techniques : programmation DOM, gestion d’événements, stockage local, responsive design, bonnes pratiques d’accessibilité (attributs ARIA minimaux sur boutons).

      3) Avec qui :

      Travail individuel sur le prototype front‑end (conception et implémentation personnelles). Collaboration ponctuelle pour relecture du code avec pairs.

      4) Contexte :

      Projet pédagogique/prototype (CCP1) visant à démontrer la maîtrise des compétences front‑end en situation proche du réel : consommer une API, afficher des données, interagir et persister localement.

      Période :

      À renseigner (champ laissé vide)

      5) Informations complémentaires (facultatif) :

      Le front consomme l’API publique `https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events` pour récupérer les événements. Le prototype démontre la navigation, l’affichage et la gestion d’un petit état local.

      ### Extraits de code (front‑end)

      Fichier : `ProjetCCP1/index.html`

      ```html
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="description" content="Découvrez les meilleurs événements à venir près de chez vous."/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="./style.css" />
          <title>eventsPortal</title>
        </head>
        <body>
          <header>
              <div class="eventsTitle">
              <h1>Les évènements</h1>
              <img class="darkModeImage" src="https://res.cloudinary.com/dwkyezu2u/image/upload/v1748013892/pngegg_1_uywwwa.png" alt="Mode Sombre">
           </div>
          </header>
          <div id="eventsContainer">
             <div id="scrollEventsContainer"></div>
          </div>
          <div id="eventModal">
            <div id="modal">
              <div id="closeModal">X</div>
              <h2 id="modalTitle"></h2>
              <p id="modalDate"></p>
              <p id="modalAdress"></p>
              <p id="modalDescription"></p>
              <p>Accéder à l'événement : <a id="modalUrl" target="_blank"></a></p>
            </div>
          </div>
          <div id="planningContainer">
            <div class="planningTitle"><h3>Mon planning</h3></div>
            <div id="scrollPlanningContainer"></div>
          </div>
          <script src="./script.js"></script>
        </body>
      </html>
      ```

      Fichier : `ProjetCCP1/style.css` (extrait)

      ```css
      * { padding: 0; margin: 0; }
      body { font-family: Arial, Helvetica, sans-serif; }
      header { background-color: #4ecdc4; }
      .eventCard { width: 250px; height: 270px; background-color: #f7fff7; border-radius: 10px; }
      /* voir fichier complet pour la totalité du style */
      ```

      Fichier : `ProjetCCP1/script.js` (extrait)

      ```javascript
      fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
        .then(response => response.json())
        .then(data => {
          const scrollEventsContainer = document.getElementById('scrollEventsContainer');
          data.events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'eventCard';
            // création du DOM, boutons détails et ajouter au planning
          });
        })
        .catch(error => console.error('Erreur API :', error));
      ```

      ---

      ## Activité‑type 2 — Développer la partie back‑end d'une application web ou web mobile sécurisée

      Exemple n°1 (tiré de `volunteer-platform`)

      1) Description des tâches et conditions :

      Conception et développement du back‑end d’une plateforme de mise en relation bénévoles/associations : mise en place d’API REST (missions, candidatures, utilisateurs), authentification JWT, gestion des rôles, validation des entrées (Joi), hachage des mots de passe (bcrypt), et persistance en base MariaDB.

      2) Moyens utilisés :

      - Langages & outils : Node.js, Express, MariaDB, JWT, Joi, bcrypt, Postman pour tests.
      - Architecture : séparation controllers/services/repositories, middlewares pour authentification/autorisation.

      3) Avec qui :

      Développement en équipe (coordination des tâches backend, revues de code ponctuelles). Le candidat a implémenté et documenté plusieurs endpoints et contribué au schéma SQL.

      4) Contexte :

      Projet réalisé dans le cadre du CCP2 ; backend complet fournissant les routes nécessaires pour gérer missions et candidatures, avec politiques d’accès selon les rôles.

      Période :

      À renseigner (champ laissé vide)

      5) Informations complémentaires :

      La base de données est modélisée relationnellement (tables users, roles, missions, applications) avec contraintes d’intégrité (clés étrangères, unique sur candidatures mission×bénévole).

      ### Extraits de code (back‑end)

      Fichier : `volunteer-platform/app.js`

      ```javascript
      import express from "express";
      import cookieParser from "cookie-parser";
      import missionRouter from "./routes/missionRoutes.js";
      import applicationRouter from "./routes/applicationRoutes.js";
      import userRouter from "./routes/userRoutes.js";

      const app = express();
      const PORT = process.env.PORT || 3000;

      app.use(express.json());
      app.use(cookieParser());

      app.use("/missions", missionRouter);
      app.use("/applications", applicationRouter);
      app.use("/users", userRouter);

      app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
      });

      export default app;
      ```

      Fichier : `volunteer-platform/config/db.js` (extrait)

      ```javascript
      import mariadb from "mariadb";
      import dotenv from "dotenv";
      dotenv.config();

      export const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        connectionLimit: 5,
      });
      ```

      Fichier : `volunteer-platform/database/schema.sql` (extrait)

      ```sql
      CREATE TABLE roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      -- tables missions et applications etc.
      ```

      Fichier : `volunteer-platform/controllers/userController.js` (extrait)

      ```javascript
      import userService from "../services/userService.js";

      export class UserController {
        constructor(userService) {
          this.userService = userService;
        }

        async register(req, res) {
          try {
            const user = await this.userService.register(req.body);
            res.status(201).json({ message: "Utilisateur créé avec succès", user });
          } catch (err) {
            if (err.message === "Email déjà utilisé") {
              return res.status(400).json({ error: "Cet email est déjà associé à un compte." });
            }
            res.status(500).json({ error: "Une erreur est survenue lors de la création du compte." });
          }
        }
      }
      export default new UserController(userService);
      ```

      ---

      ## Titres, diplômes, CQP, attestations (facultatif)

      Intitulé | Organisme | Date
      ---|---|---

      À compléter selon vos diplômes et certifications.

      ---

      ## Déclaration sur l'honneur

      Je soussigné(e) [prénom et nom], déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts et que je suis l'auteur(e) des réalisations jointes.

      Fait à :

      Le :

      Signature :

      ---

      ## Annexes

      - Code source (voir répertoires `ProjetCCP1` et `volunteer-platform`).
      - Base de données : `volunteer-platform/database/schema.sql`.
      - Documentation API : lien Postman dans `volunteer-platform/README.md`.

      ---

      _Document généré automatiquement — vérifiez et complétez les champs administratifs et les périodes avant soumission au jury._
````
