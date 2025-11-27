# DOSSIER PROFESSIONNEL (DP) — Modèle conforme

> Remarque : ce dossier respecte la structure et les consignes générales indiquées dans "Aide à la rédaction pour le candidat issu de la formation" (version 01/06/2016). Les champs personnels (nom, période, signatures) sont laissés vides pour que vous les complétiez.

---

## Page de garde

- Titre du dossier : Dossier Professionnel — CCP2
- Candidat :
- Nom :
- Prénom :
- Date de naissance :
- Période de référence (période d'activité décrite) :
- Organisme de formation :
- Intitulé du titre préparé : Développeur Web / Web Mobile (ou intitulé exact)

> Ne modifiez pas le contenu des rubriques obligatoires du modèle officiel. Numérotez les pages.

---

## Sommaire

1. Présentation générale du projet
2. Activité‑type 1 : Développement front‑end (Exemple)
3. Activité‑type 2 : Développement back‑end (Exemple)
4. Titres, diplômes et attestations
5. Déclaration sur l'honneur
6. Annexes (extraits de code, schéma BD, fichiers de configuration)

---

## 1. Présentation générale du projet

- Intitulé du projet : `volunteer-platform` (backend) et prototype `ProjetCCP1` (frontend)
- Nature : Application web de mise en relation bénévoles / associations (API REST) + prototype front consommant une API publique d'événements
- Environnement technique (synthèse) : Node.js, Express, MariaDB, JWT, Joi, bcrypt, HTML/CSS/JS pour le prototype frontend.
- Objectifs professionnels visés : conception d'une API sécurisée, gestion des rôles et permissions, modélisation BD relationnelle, mise en place d'un front consommant une API et gérant l'état local.
- Contexte d'exécution : projet réalisé dans le cadre de la formation (CCP2) — développement en local et tests via Postman / navigateur.

---

## 2. Activité‑type 1 — Développer la partie front‑end d'une application web ou web mobile sécurisée

### 2.1 Présentation de l'activité

- Nom de l'activité : Développement d'un prototype front‑end d'affichage d'événements
- Durée / période :
- Lieu : environnement local / navigateur
- Conditions : prototype consommant une API publique, gestion de l'affichage, interactivité (modal, ajout au planning), responsive design.

### 2.2 Description des tâches réalisées

- Conception de la structure HTML (fichier `ProjetCCP1/index.html`).
- Rédaction des styles (fichier `ProjetCCP1/style.css`) : mise en page des cartes événements, gestion du mode sombre, responsive.
- Programmation JavaScript (fichier `ProjetCCP1/script.js`) : appel `fetch` vers `https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events`, création dynamique des cartes, modal de détail, ajout/suppression au planning (stockage dans `localStorage`).
- Tests manuels sur navigateurs, vérification de la robustesse face aux données manquantes.

### 2.3 Compétences mobilisées (référentiel)

- Récupérer des données via une API REST et les afficher.
- Développer une interface utilisateur interactive et accessible.
- Gérer la persistance locale (localStorage) pour un état utilisateur.
- Appliquer des règles de responsive design.

### 2.4 Preuves et éléments de contexte (exemples)

- Extraits de code (sélection) :

```html
<!-- ProjetCCP1/index.html (extrait) -->
<div id="eventsContainer">
  <div id="scrollEventsContainer"></div>
</div>
<div id="eventModal">...</div>
```

```javascript
// ProjetCCP1/script.js (extrait)
fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
  .then((response) => response.json())
  .then((data) => {
    const scrollEventsContainer = document.getElementById(
      "scrollEventsContainer"
    );
    data.events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "eventCard";
      // création du DOM, boutons détails et ajouter au planning
    });
  })
  .catch((error) => console.error("Erreur API :", error));
```

- Fichiers sources disponibles dans le répertoire `ProjetCCP1/`.

---

## 3. Activité‑type 2 — Développer la partie back‑end d'une application web ou web mobile sécurisée

### 3.1 Présentation de l'activité

- Nom de l'activité : Conception et développement d'une API REST pour la gestion des missions et candidatures
- Durée / période :
- Lieu : environnement local / serveur Node.js
- Conditions : architecture controllers/services/repositories, tests via Postman, base MariaDB.

### 3.2 Description des tâches réalisées

- Mise en place du serveur Express (`volunteer-platform/app.js`), configuration middlewares (JSON parsing, cookieParser).
- Implémentation des routes principales (`routes/missionRoutes.js`, `routes/applicationRoutes.js`, `routes/userRoutes.js`).
- Sécurisation via JWT (middleware `middlewares/authenticateToken.js`), gestion des rôles (middleware `authorizeRole.js`).
- Validation des entrées avec Joi (validators/\*), hachage des mots de passe et gestion des erreurs utilisateurs.
- Modélisation de la base de données : `volunteer-platform/database/schema.sql` (tables users, roles, missions, applications), scripts de seed.

### 3.3 Compétences mobilisées (référentiel)

- Concevoir une API REST et définir ses routes
- Implémenter des mécanismes d'authentification et d'autorisation
- Valider les données entrantes et gérer les erreurs
- Concevoir le schéma relationnel et réaliser les migrations/seeds

### 3.4 Preuves et éléments de contexte (exemples)

- Extrait `volunteer-platform/app.js` (extrait):

````javascript
import express from "express";
import cookieParser from "cookie-parser";
import missionRouter from "./routes/missionRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
# DOSSIER PROFESSIONNEL (DP) — Version développée pour conversion

> Note : Ce document reprend les consignes officielles et les applique aux projets `volunteer-platform` (backend) et `ProjetCCP1` (frontend). Les champs personnels et dates restent à remplir par le candidat.

---

## Page de garde

- Intitulé : Dossier Professionnel — CCP2
- Candidat :
- Nom :
- Prénom :
- Date de naissance :
- Période de référence :
- Organisme de formation :
- Intitulé du titre préparé : Développeur Web / Web Mobile

Numérotez les pages. Ne modifiez pas les rubriques obligatoires.

---

## Sommaire

1. Présentation générale du projet
2. Activité‑type 1 — Développement front‑end (cas pratique)
   - Contexte, tâches, travail détaillé
   - Extraits de code et captures (placeholders)
   - Résultats et tests
3. Activité‑type 2 — Développement back‑end (cas pratique)
   - Contexte, tâches, architecture
   - Endpoints, exemples d'appels et réponses
   - Schéma base de données et scripts
4. Cas de sécurisation et gestion des rôles
5. Plan de test, recettes et preuves
6. Compétences mobilisées et grille de correspondance (REAC/RC)
7. Bilan personnel et points d'amélioration
8. Déclaration sur l'honneur
9. Annexes (fichiers, code, SQL, Postman)

---

## 1. Présentation générale du projet

Projet principal : `volunteer-platform`

- Objectif : développer une application permettant aux associations de publier des missions et aux bénévoles d'y candidater. L'application gère l'inscription, l'authentification, les rôles, la création/gestion des missions et le traitement des candidatures.
- Technologies : Node.js, Express, MariaDB, JWT, Joi, bcrypt, HTML/CSS/JS.
- Rôles identifiés : Bénévoles, Associations, administrateur (potentiel).
- Méthode : architecture MVC légère (controllers, services, repositories), tests manuels via Postman, développement iteratif.

Contexte pédagogique : réalisation dans le cadre du CCP2, avec contraintes de temps et d'un périmètre limité pour couvrir l'ensemble des compétences requises.

---

## 2. Activité‑type 1 — Développement front‑end (cas pratique)

2.1 Contexte et finalité

Le prototype `ProjetCCP1` vise à démontrer la capacité à consommer une API publique et à construire une interface interactive pour l'utilisateur final (affichage d'événements, modal de détail, gestion d'un planning personnel). Le front ne met pas en place d'authentification complète mais illustre les bonnes pratiques UI/UX.

2.2 Tâches détaillées réalisées

- Rédaction du HTML sémantique (`index.html`) : structuration des sections, header, containers pour le contenu dynamique.
- Stylisation complète avec `style.css` : gestion responsive, composants cartes, modale, états cliqués et animations simples.
- Écriture du JavaScript (`script.js`) :
  - Récupération asynchrone des données via `fetch`.
  - Construction dynamique des cartes évènement.
  - Gestion d'un modal accessible (mise à jour du DOM et gestion du focus).
  - Persistance locale du planning via `localStorage`.
  - Gestion du mode sombre à l'aide d'un cookie et d'une classe CSS.

2.3 Extrait de code — JavaScript (sélection commentée)

```javascript
// Récupération des événements via fetch et affichage des cartes
fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('scrollEventsContainer');
    data.events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'eventCard';
      // titre
      const title = document.createElement('h2');
      title.className = 'eventTitle';
      title.textContent = event.title;
      // date
      const date = document.createElement('p');
      date.className = 'eventDate';
      const parts = event.start_date.split(' ')[0].split('-');
      date.textContent = `Date: ${parts[2]}-${parts[1]}-${parts[0]}`;
      // ajout au DOM
      card.append(title, date);
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Erreur API :', err));
````

2.4 Tests et preuves

- Tests manuels effectués : navigation, ouverture modale, ajout/suppression au planning, affichage responsive sur mobile et desktop.
- Logs de console et captures d'écran (fichiers à joindre en annexe si requis).
- Preuves de fonctionnement : code source présent dans `ProjetCCP1/`.

  2.5 Difficultés rencontrées et solutions

- Problème : certaines données retournées par l'API publique sont nulles (venue non renseignée). Solution : affichage conditionnel et message alternatif "Lieu: non communiqué".
- Problème : gestion du stockage local (format d'ID). Solution : normaliser les ID stockés et vérifier l'existence des événements au rechargement.

---

## 3. Activité‑type 2 — Développement back‑end (cas pratique)

3.1 Contexte et finalité

Développer une API REST sécurisée permettant la gestion des utilisateurs, la création des missions par les associations et la gestion des candidatures par les bénévoles. L'objectif pédagogique est de démontrer la maîtrise des concepts de persistance, sécurisation et architecture logicielle.

3.2 Architecture et composants

- Entrée : `volunteer-platform/app.js` (Express)
- Contrôleurs : `controllers/*Controller.js` (User, Mission, Application)
- Services : logique métier
- Repositories : accès à la base MariaDB
- Middlewares : `authenticateToken`, `authorizeRole`
- Base : `database/schema.sql` (tables users, roles, user_roles, missions, applications)

  3.3 Mise en place et exemples d'implémentation

Extrait `app.js` :

```javascript
import express from "express";
import cookieParser from "cookie-parser";
import missionRouter from "./routes/missionRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/missions", missionRouter);
app.use("/applications", applicationRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000);
```

3.4 Exemples d'appels API (Postman / cURL)

- Inscription :

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jean Dupont","email":"jean@example.com","password":"P@ssw0rd","roles":["Bénévole"]}'
```

- Connexion (login) :

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jean@example.com","password":"P@ssw0rd"}'
```

- Créer une mission (role Association) :

```bash
curl -X POST http://localhost:3000/missions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"Collecte alimentaire","description":"Aider à trier les denrées","date":"2025-12-01","association_id":5}'
```

Réponses types (exemple) :

```json
{
  "id": 12,
  "association_id": 5,
  "title": "Collecte alimentaire",
  "description": "Aider à trier les denrées",
  "date": "2025-12-01",
  "created_at": "2025-10-01T12:00:00"
}
```

3.5 Schéma de la base de données (extrait complet)

```sql
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS missions;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

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

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE missions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  association_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (association_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mission_id INT NOT NULL,
  volunteer_id INT NOT NULL,
  status ENUM('En attente','Acceptée','Refusée') DEFAULT 'En attente',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
  FOREIGN KEY (volunteer_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (mission_id, volunteer_id)
);
```

3.6 Gestion des erreurs et validation

- Validation Joi utilisée pour s'assurer de la présence des champs requis.
- Gestion des erreurs renvoyant des codes HTTP appropriés (400, 401, 403, 404, 500).
- Messages d'erreur user‑friendly pour les cas attendus (email déjà utilisé, resource not found).

---

## 4. Sécurisation, authentification et gestion des rôles

4.1 Authentification

- JWT stocké en cookie `httpOnly` pour limiter l'exposition côté client.
- Durée du token courte pour limiter l'impact d'un vol de token ; renouvellement via login.

  4.2 Autorisation

- Middleware `authorizeRole(role)` vérifie que l'utilisateur dispose du rôle requis pour l'action (ex : création de mission réservée aux `Associations`).

  4.3 Bonnes pratiques appliquées

- Hachage des mots de passe via `bcrypt`.
- Validation côté serveur de toutes les entrées.
- Utilisation de requêtes paramétrées dans les repositories (prévention injection SQL).

---

## 5. Plan de test, recettes et preuves

5.1 Tests unitaires et manuels

- Tests unitaires : (si implémentés) tests sur services et repositories (exemples Mocha/Jest). Si non présents, prévoir l'ajout.
- Tests manuels :

  - Inscription et connexion
  - Création de mission en tant qu'association
  - Postuler à une mission en tant que bénévole
  - Changement de statut d'une candidature (acceptation / refus)
  - Vérifier les cas d'erreur (duplication, champs manquants)

  5.2 Recette (procédure synthétique)

1. Préparer la base (`schema.sql`) et insérer des jeux d'essai via `seed.js` (si présent).
2. Démarrer le serveur : `node app.js` ou `npm run dev`.
3. Importer la collection Postman et exécuter les scénarios de tests.
4. Vérifier les logs et la base pour confirmer l'état attendu.

5.3 Preuves jointes

- Export Postman (lien dans README) — joindre l'export JSON en annexe si nécessaire.
- Extraits de logs et captures d'écran des réponses 200/201/401/403/404.

---

## 6. Correspondance avec le référentiel (REAC / RC)

Tableau synthétique (exemples) :

- **Activité** : Développer une API REST sécurisée — **Compétences** : Authentifier, autoriser, valider, concevoir schéma BD.
- **Activité** : Développer un front interactif — **Compétences** : Consommer API, gérer le DOM, rendre responsive.

Grille de compétences (extraits) :

1. Conception technique : modéliser la base — Preuve : `database/schema.sql`.
2. Développement back : implémenter endpoints — Preuve : `controllers/*.js`.
3. Développement front : réaliser UI et interactions — Preuve : `ProjetCCP1/*`.
4. Tests & recette : scénarios Postman — Preuve : export Postman.

---

## 7. Bilan personnel et pistes d'amélioration

- Points forts : maîtrise de la pile technique choisie, séparation claire des responsabilités (controllers/services/repositories), soucis de sécurisation (JWT, bcrypt).
- Points à améliorer : couverture de tests automatisés, documentation des erreurs, ajout d'un pipeline CI et d'un Dockerfile pour faciliter le déploiement.

---

## 8. Déclaration sur l'honneur

Je soussigné(e) [Prénom NOM], déclare sur l'honneur que les éléments présentés dans ce dossier sont exacts et que je suis l'auteur(e) des réalisations citées.

Fait à :

Le :

Signature :

---

## 9. Annexes (sélection de fichiers et extraits)

9.1 Arborescence synthétique

```
ProjetCCP1/
  ├─ index.html
  ├─ style.css
  └─ script.js

volunteer-platform/
  ├─ app.js
  ├─ package.json
  ├─ PERMISSIONS.md
  ├─ README.md
  ├─ config/
  │  └─ db.js
  ├─ controllers/
  │  ├─ userController.js
  │  └─ missionController.js
  ├─ services/
  ├─ repositories/
  ├─ routes/
  └─ database/
     ├─ schema.sql
     └─ seed.js
```

9.2 Extraits complets importants

`controllers/userController.js` :

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
        return res
          .status(400)
          .json({ error: "Cet email est déjà associé à un compte." });
      }
      console.error("Erreur lors de l'inscription :", err);
      res
        .status(500)
        .json({
          error: "Une erreur est survenue lors de la création du compte.",
        });
    }
  }

  async login(req, res) {
    try {
      const result = await this.userService.login(req.body);
      const { token, user } = result;
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Connexion réussie", user });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  logout(req, res) {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Déconnexion réussie" });
  }

  async getAllUsers(req, res) {
    try {
      const { role } = req.query;
      let users = role
        ? await this.userService.getUsersByRole(role)
        : await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ error: "Utilisateur introuvable" });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await this.userService.deleteUser(req.params.id);
      res.status(200).json({ message: "Utilisateur supprimé", result });
    } catch (err) {
      const status = err.message === "Utilisateur introuvable" ? 404 : 500;
      res.status(status).json({ error: err.message });
    }
  }
}
export default new UserController(userService);
```

`controllers/missionController.js` :

```javascript
import missionService from "../services/missionService.js";

export class MissionController {
  constructor(missionService) {
    this.missionService = missionService;
  }

  async createMission(req, res) {
    try {
      const { title, description, date, association_id } = req.body;
      if (!title || !description || !date || !association_id)
        return res.status(400).json({ error: "Champs requis manquants" });
      const mission = await this.missionService.createMission({
        title,
        description,
        date,
        association_id,
      });
      res.status(201).json(mission);
    } catch (error) {
      if (error.message === "Association introuvable ou rôle invalide")
        return res.status(404).json({ error: error.message });
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async getAllMissions(req, res) {
    try {
      const missions = await this.missionService.getAllMissions();
      res.status(200).json(missions);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async updateMission(req, res) {
    try {
      const { id } = req.params;
      const { title, description, date } = req.body;
      if (!title || !description || !date)
        return res.status(400).json({ error: "Champs requis manquants" });
      const updated = await this.missionService.updateMission(id, {
        title,
        description,
        date,
      });
      res.status(200).json(updated);
    } catch (error) {
      if (error.message === "Mission introuvable")
        return res.status(404).json({ error: "Mission introuvable" });
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async deleteMission(req, res) {
    try {
      const { id } = req.params;
      const result = await this.missionService.deleteMission(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Mission introuvable")
        return res.status(404).json({ error: "Mission introuvable" });
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
export default new MissionController(missionService);
```

9.3 Fichiers SQL et scripts

Le schéma SQL complet est joint ci‑dessus (section 3.5). Si des scripts `seed.js` existent, joignez‑les en annexe pour démontrer l'initialisation de jeux d'essai.

9.4 Export Postman et documentation

- Lien public indiqué dans le `README.md` : https://documenter.getpostman.com/view/46341307/2sB3Hooz3h

---

## Mode d'emploi pour finaliser le DP

1. Relisez et complétez les champs personnels (page de garde et périodes).
2. Joignez les preuves annexes (captures, export Postman, logs, fichiers complets si demandés).
3. Si vous souhaitez que je convertisse en `.docx`, confirmez et je génèrerai le fichier final et l'optimiserai (sauts de page, titres, TOC).

---

_Fichier généré automatiquement — revoyez les dates/périodes et dites‑moi si vous souhaitez l'export `.docx` maintenant._
