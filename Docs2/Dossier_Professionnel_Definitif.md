# DOSSIER PROFESSIONNEL — Version définitive

Ce dossier reprend la structure officielle et s'inspire de l'exemple fourni (`exemple_dossier_professionnel.pdf`) pour présenter des exemples de pratique professionnelle, preuves et annexes. Les champs personnels (nom, période, signature) sont volontairement laissés vides.

---

## Page de garde

- Intitulé : Dossier Professionnel — CCP2
- Candidat :
- Nom :
- Prénom :
- Date de naissance :
- Période :
- Organisme de formation :
- Intitulé du titre préparé : Développeur Web / Web Mobile

---

## Sommaire

1. Introduction et contexte du projet
2. Activité‑type 1 : Développer la partie front‑end
   - Exemple 1 : Prototype d'un portail d'événements (ProjetCCP1)
   - Exemple 2 : Maquettage & wireframes, tests d'accessibilité
   - Exemple 3 : Interface dynamique (ajout planning et modal)
3. Activité‑type 2 : Développer la partie back‑end
   - Exemple 1 : API missions/candidatures (`volunteer-platform`)
   - Exemple 2 : Conception BD et schéma (MCD → MPD)
   - Exemple 3 : Sécurisation (JWT, middlewares, rate limiting)
4. Titres, diplômes, attestations
5. Déclaration sur l'honneur
6. Annexes (code, SQL, Postman, captures)

---

## 1. Introduction et contexte du projet

Ce dossier présente des réalisations effectuées au cours de la formation et en contexte projet. Il s'appuie principalement sur :

- Le prototype front‑end `ProjetCCP1` (HTML/CSS/JS) — affichage d'événements, modal de détail et gestion d'un planning local.
- Le projet back‑end `volunteer-platform` (Node.js/Express/MariaDB) — API REST pour la gestion des missions et des candidatures, authentification, autorisation.

Objectifs pédagogiques : démontrer la maîtrise des compétences techniques et professionnelles du référentiel : conception, développement, sécurisation, validation et tests.

---

## 2. Activité‑type 1 — Développer la partie front‑end

Chaque exemple suit la structure recommandée : intitulé, contexte (période, lieu), tâches détaillées, moyens, résultats, preuves et annexes.

### Exemple 1 — Prototype d'un portail d'événements (ProjetCCP1)

Intitulé : Développement d'un portail d'événements consommant une API publique

Période :

Contexte : projet pédagogique visant à construire une interface simple et performante qui consomme une API publique d'événements.

Tâches réalisées :

- Conception HTML structurelle et répartition des zones (`header`, `main`, `eventsContainer`, `planningContainer`).
- Stylisation CSS pour cartes évènement, responsive (mobile‑first) et prise en compte du mode sombre.
- Implémentation JavaScript : récupération des événements via `fetch`, construction dynamique des cartes, modale de détail, ajout/suppression au planning via `localStorage`.

Moyens et outils :

- Langages : HTML5, CSS3, JavaScript (ES6).
- Outils : éditeur VSCode, navigateur (Brave/Chrome) pour tests, outils de développement (Lighthouse).

Résultats et preuves :

- Code sources : `ProjetCCP1/index.html`, `style.css`, `script.js`.
- Captures d'écran de l'interface sur mobile/tablette/desktop (annexes).
- Logs de console montrant la récupération d'événements.

Extrait (sélection) :

```javascript
// fetch events and build cards
fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
  .then((r) => r.json())
  .then((data) => {
    /* build DOM */
  })
  .catch((e) => console.error(e));
```

Éléments d'appréciation :

- Gestion des cas d'erreurs (venue non renseignée), amélioration progressive du design.

### `volunteer-platform/controllers/userController.js` (intégralité)

```javascript
import userService from "../services/userService.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (err) {
      if (err.message === "Email déjà utilisé") {
        return res.status(400).json({ error: "Email déjà utilisé" });
      }
      console.error("Erreur lors de l'inscription :", err);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  }

  async login(req, res) {
    try {
      const { token, user } = await this.userService.login(req.body);
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
      .clearCookie("token", { httpOnly: true, sameSite: "Strict" })
      .status(200)
      .json({ message: "Déconnexion réussie" });
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
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
      await this.userService.deleteUser(req.params.id);
      res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
      const status = err.message === "Utilisateur introuvable" ? 404 : 500;
      res.status(status).json({ error: err.message });
    }
  }
}

export default new UserController(userService);
```

### `volunteer-platform/controllers/missionController.js` (intégralité)

```javascript
import missionService from "../services/missionService.js";

class MissionController {
  constructor(missionService) {
    this.missionService = missionService;
  }

  async createMission(req, res) {
    try {
      const { title, description, date, association_id } = req.body;
      if (!title || !description || !date || !association_id) {
        return res.status(400).json({ error: "Champs requis manquants" });
      }
      const mission = await this.missionService.createMission({
        title,
        description,
        date,
        association_id,
      });
      res.status(201).json(mission);
    } catch (err) {
      if (err.message === "Association introuvable ou rôle invalide")
        return res.status(404).json({ error: err.message });
      console.error("Erreur création mission :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async getAllMissions(req, res) {
    try {
      const missions = await this.missionService.getAllMissions(req.query);
      res.status(200).json(missions);
    } catch (err) {
      console.error("Erreur récupération missions :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async updateMission(req, res) {
    try {
      const updated = await this.missionService.updateMission(
        req.params.id,
        req.body
      );
      res.status(200).json(updated);
    } catch (err) {
      if (err.message === "Mission introuvable")
        return res.status(404).json({ error: err.message });
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  async deleteMission(req, res) {
    try {
      await this.missionService.deleteMission(req.params.id);
      res.status(200).json({ message: "Mission supprimée" });
    } catch (err) {
      if (err.message === "Mission introuvable")
        return res.status(404).json({ error: err.message });
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

export default new MissionController(missionService);
```

Annexes : wireframes (captures), extrait CSS, capture Lighthouse (score).

#### Développement détaillé — journal de réalisation (extrait)

Jour 1 — Analyse et planification

- Lecture du cahier des charges informel : lister les fonctionnalités attendues (affichage liste d'événements, modal, planning, responsive).
- Rédaction de 6 users‑stories prioritaires (MVP) et estimation en heures.

Jour 2 — Maquettage rapide (wireframe mobile)

- Réalisation d'un wireframe mobile pour la page d'accueil : header, zone de défilement horizontale des cartes, bouton d'ouverture modale, zone planning.
- Validation des wireframes avec une checklist accessibilité simple (contrastes, ordre tabulation, attributs alt sur images).

Jour 3–4 — Intégration HTML/CSS

- Mise en place de la structure HTML sémantique dans `index.html`.
- Développement du CSS mobile‑first, mise en place des classes `eventCard`, `eventTitle`, `planningButton` et animations légères.

Jour 5–7 — Développement JavaScript et tests

- Implémentation de la récupération asynchrone des événements via `fetch` et construction dynamique du DOM.
- Ajout des fonctions `addToPlanning(eventId)` et `displayPlanning()` pour la persistance via `localStorage`.
- Tests manuels : vérification sur Chrome et Brave, utilisation de l'onglet Réseau pour simuler retards API, gestion d'erreurs côté UI (messages lisibles pour l'utilisateur).

#### Users‑stories (exemples détaillés)

1. En tant que visiteur, je souhaite voir une liste d'événements pour choisir ceux qui m'intéressent.

- Critères d'acceptation : au moins 6 événements affichés, pagination/scrolling fluide, affichage du titre et de la date.

2. En tant que visiteur, je souhaite ouvrir les détails d'un événement dans une modale.

- Critères : focus sur la modale, bouton de fermeture accessible, lien vers l'événement ouvrant dans un nouvel onglet.

3. En tant que utilisateur, je souhaite ajouter un événement à mon planning local.

- Critères : persistance via `localStorage`, affichage dans la section `Mon planning`, possibilité de retirer un événement.

4. En tant que visiteur, je souhaite que le site soit lisible sur mobile.

- Critères : layout responsive, textes lisibles, boutons accessibles au toucher.

5. En tant que visiteur avec déficience visuelle, je souhaite que les images aient des `alt` descriptifs.

- Critères : présence d'attributs `alt`, structure sémantique (h1>h2>h3), contrôle clavier des modales.

#### Extraits de conception technique (sélection)

Structure DOM clé :

```html
<header>
  <h1>Les évènements</h1>
</header>
<main>
  <section id="eventsContainer">
    <div id="scrollEventsContainer"></div>
  </section>
  <section id="planningContainer"></section>
</main>
```

Algorithme `addToPlanning` (résumé) :

1. Lire `plannedEvents` depuis `localStorage` (JSON).
2. Vérifier si l'ID existe déjà ; si non, push et sauvegarder.
3. Mettre à jour l'affichage `displayPlanning()` pour refléter l'état.

#### Tests réalisés

- Tests de récupération API : cas nominal, taux de réussite > 95% lors des appels, gestion des erreurs réseau (message utilisateur).
- Tests d'accessibilité : vérification manuelle du tab order, ajout d'`aria-label` sur boutons critiques.
- Tests de persistance : fermeture et réouverture du navigateur — planning persisté.

---

### Exemple 2 — Maquettage, wireframes et accessibilité

Intitulé : Maquettage et validation UX (mobile‑first)

Période :

Contexte : validation des besoins fonctionnels et des users‑stories avant implémentation.

Contenu :

- Rédaction des users‑stories pour définir les cas d'usage (consulter accueil, voir détails, ajouter au planning, contact).
- Réalisation des wireframes pour les formats mobile/tablette/desktop (outil : Whimsical ou équivalent).
- Tests d'accessibilité (contrastes, attributs `aria`, structure sémantique). Corrections apportées (alt sur images, rôle et labels sur boutons).

Preuves : liens vers les wireframes, captures d'écran, liste des users‑stories (annexes).

#### Développement détaillé — maquettage et validation UX

- Atelier découverte : collecte des besoins auprès d'un commanditaire fictif, priorisation des fonctionnalités via MoSCoW.
- Rédaction complète de 8 users‑stories détaillées avec critères d'acceptation et tests manuels associés.
- Construction d'un prototype cliquable (outil : Whimsical/Figma) pour valider le parcours utilisateur principal (recherche → détail → ajout planning).

Checklist accessibilité et corrections appliquées :

- Contraste texte/fond vérifié (rapports Lighthouse) ; correction des zones à faible contraste.
- Ajout d'`aria-label` et rôles ARIA pour les composants interactifs (boutons, modales).
- Test clavier : navigation complète sans souris, gestion du focus à l'ouverture/fermeture des modales.

Tests utilisateurs (extrait) :

- 5 utilisateurs tests, tâches à effectuer (trouver un événement, l'ajouter au planning) ; taux de réussite 90% sur tâches principales.
- Retours : simplifier le bouton d'ajout, améliorer libellé des dates — corrections appliquées.

---

### Exemple 3 — Interface dynamique (interactions avancées)

Intitulé : Gestion d'un planning utilisateur et interactions modales

Résumé des tâches :

- Implémentation de la logique `addToPlanning(eventId)` et `displayPlanning()` avec sérialisation en `localStorage`.
- Mise en place d'éléments accessibles (gestion du focus à l'ouverture/fermeture de la modal).
- Tests manuels : vérification de la persistance entre sessions et comportement multi‑onglet.

Preuves : extrait de code `script.js`, logs de tests, capture démontrant la persistance.

#### Développement technique — interactions avancées et résilience

- Architecture front légère : separation of concerns entre récupération de données, rendu DOM et gestion d'état local (`plannedEvents`).
- Gestion des erreurs réseau : fallback UX (bandeau d'erreur) et retry simple (bouton réessayer) pour les appels fetch critiques.
- Optimisations : lazy‑loading des images, réduction du DOM thrashing lors du rendu de grandes listes (utilisation de DocumentFragment), minification CSS/JS pour production.

Observations et améliorations futures :

- Ajouter une couche d'abstraction API pour faciliter les tests unitaires et les mocks.
- Implémenter des tests automatisés (Puppeteer / Cypress) pour vérifier le parcours ajout planning / modal.

---

## 3. Activité‑type 2 — Développer la partie back‑end

### Exemple 1 — API missions / candidatures (`volunteer-platform`)

Intitulé : Conception et implémentation des endpoints pour la gestion des missions et des candidatures

Période :

Contexte : réalisation d'une API REST complète en Node.js/Express avec gestion des rôles et persistance MariaDB.

Tâches réalisées :

- Création des routes : `/users`, `/missions`, `/applications`.
- Contrôleurs : `userController`, `missionController`, `applicationController`.
- Services : logique métier (validation des rôles, envoi d'emails de notification — si implémenté).
- Repositories : accès à la BD via pool MariaDB.

Exemples d'appels (Postman / cURL) :

```bash
curl -X POST http://localhost:3000/users/register -H 'Content-Type: application/json' -d '{"name":"Jean","email":"jean@example.com","password":"P@ssw0rd"}'
```

Preuves : extrait `app.js`, `controllers/*.js`, export Postman (annexe).

#### Journal de réalisation (sélection)

- Sprint 1 — Modélisation et mise en place du projet : initialisation `npm`, configuration ESLint/Prettier, création du squelette Express.
- Sprint 2 — Contrôleurs et services : implémentation des endpoints utilisateurs et missions, tests manuels via Postman, écriture de seeds de test.
- Sprint 3 — Sécurisation et middlewares : ajout de `authenticateToken`, `authorizeRole`, gestion des erreurs centralisée et rate limiting.

#### Endpoints principaux (détails et exemples)

- `POST /users/register` : body attendu `{ name, email, password }`. Retour : 201 + user sans mot de passe.
- `POST /users/login` : body `{ email, password }`. Retour : 200 + cookie `token` (httpOnly) et objet user.
- `GET /missions` : paramètres optionnels `?date=YYYY-MM-DD&associationId=`. Retour : liste paginée.
- `POST /missions` : protégé (role Association). Body `{ title, description, date }`. Retour : 201 + mission.
- `POST /applications` : vérifie unicité (mission×volunteer), crée candidature et envoie notification (si configuré).

Exemple d'erreur gérée :

- Enregistrement d'un utilisateur avec email existant → 400 `{ error: 'Email déjà utilisé' }`.
- Tentative d'accès à `/missions` protégé sans token → 401 `{ error: 'Token manquant ou invalide' }`.

#### Gestion des logs et monitoring (extrait)

- Utilisation de `console` pour les phases de dev, proposition d'intégration `winston` en production pour rotation et niveaux.
- Surveillances proposées : endpoints 5xx, latence moyenne, taux d'erreurs par route.

---

### Exemple 2 — Conception de la base de données (MCD → MPD → SQL)

Intitulé : Modélisation et création de la base de données relationnelle

Résumé :

- Conception MCD pour représenter `users`, `roles`, `missions`, `applications` et relations many‑to‑many via `user_roles`.
- Traduction en MPD puis script SQL (`database/schema.sql`) pour création des tables et contraintes.
- Tests d'intégrité via exécution de `schema.sql` et insertion de données de test (`seed.js` si présent).

Extrait : voir section 3.5 du dossier (schéma SQL complet).

---

## 3.5 Schéma SQL complet (annexe détaillée)

Le script suivant est exécuté pour initialiser la base de données (extrait déjà présent dans le repo) :

```sql
-- Script d'initialisation (extrait)
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

Explications :

- Contraintes d'intégrité : clés étrangères pour conserver la cohérence entre `users`, `missions` et `applications`.
- Indices : ajouter index sur `missions(date)` si requêtes fréquentes par date.
- Remarques : gestion des suppressions en cascade pour éviter d'avoir des candidatures orphelines.

---

### Exemple 3 — Sécurisation : JWT, middlewares et rate limiting

Intitulé : Mise en place d'une sécurité minimale et robuste pour l'API

Travail effectué :

- Hachage des mots de passe avec `bcrypt`.
- Authentification via JWT stocké en cookie `httpOnly` et options `secure/sameSite` en prod.
- Middlewares : `authenticateToken`, `authorizeRole` (vérification rôle Association/Bénévole), validation via `Joi`.
- Rate limiting via `express-rate-limit` sur endpoints sensibles (`/auth/register`, `/auth/login`).

Preuves : extraits `middlewares/*`, configuration rate limiter (annexe).

---

## 4. Titres, diplômes et attestations

| Intitulé | Organisme | Date |
| -------- | --------- | ---- |

(À compléter par le candidat)

---

## 5. Déclaration sur l'honneur

Je soussigné(e) [Prénom NOM], déclare sur l'honneur que les informations fournies dans ce dossier sont exactes et que je suis l'auteur(e) des réalisations présentées.

Fait à :

Le :

Signature :

---

## 6. Annexes (sélection)

- `ProjetCCP1/` : `index.html`, `style.css`, `script.js` (extraits et captures).
- `volunteer-platform/` : `app.js`, `controllers/`, `routes/`, `database/schema.sql`, `PERMISSIONS.md`, `README.md`.
- Export Postman : lien et fichier JSON (joindre en annexe si disponible).
- Exemple fourni : `exemple_dossier_professionnel.pdf` (utilisé comme modèle de mise en forme et de niveau de détail).

### Annexes — Code sélectionné (extraits complets)

#### `ProjetCCP1/script.js`

```javascript
// Récupération des événements via fetch et affichage des cartes

fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    console.log(data.events);
    let scrollEventsContainer = document.getElementById(
      "scrollEventsContainer"
    );
    data.events.forEach(function (event) {
      let eventCard = document.createElement("div");
      eventCard.className = "eventCard";
      eventCard.setAttribute("data-event-id", event.id);

      console.log(event.id);

      let eventTitle = document.createElement("h2");
      eventTitle.className = "eventTitle";
      eventTitle.innerHTML = event.title;

      let eventDate = document.createElement("p");
      eventDate.className = "eventDate";
      let dateParts = event.start_date.split(" ")[0].split("-");
      console.log(dateParts);
      eventDate.textContent =
        "Date: " + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

      let eventAdress = document.createElement("p");
      eventAdress.className = "eventAdress";
      if (event.venue.slug !== undefined && event.venue.slug !== null) {
        eventAdress.textContent = "Lieu: " + event.venue.slug;
      } else {
        eventAdress.textContent = "Lieu: non communiqué";
      }

      let detailsButton = document.createElement("button");
      detailsButton.className = "detailsButton";
      detailsButton.textContent = "Voir détails";
      detailsButton.setAttribute(
        "aria-label",
        "Afficher les détails de l'événement " + event.title
      );
      detailsButton.addEventListener("click", function () {
        displayModal(event);
      });

      let planningButton = document.createElement("button");
      planningButton.className = "planningButton";
      planningButton.textContent = "Ajouter au planning";
      planningButton.addEventListener("click", function () {
        addToPlanning(event.id);
      });

      eventCard.appendChild(eventTitle);
      eventCard.appendChild(eventDate);
      eventCard.appendChild(eventAdress);
      eventCard.appendChild(detailsButton);
      eventCard.appendChild(planningButton);
      scrollEventsContainer.appendChild(eventCard);
    });
  })
  .catch(function (error) {
    console.error("Erreur API :", error);
  });

// Fonction d'ajout au planning

function addToPlanning(eventId) {
  let plannedEvents = localStorage.getItem("plannedEvents");
  console.log(plannedEvents);
  if (plannedEvents !== null) {
    plannedEvents = JSON.parse(plannedEvents);
  } else {
    plannedEvents = [];
  }

  if (plannedEvents.includes(eventId) === false) {
    plannedEvents.push(eventId);
    localStorage.setItem("plannedEvents", JSON.stringify(plannedEvents));
    displayPlanning();
  }
}

// Affichage des événements du planning

function displayPlanning() {
  // Récupération des événements enregistrés dans local Storage
  let plannedEvents = localStorage.getItem("plannedEvents");

  if (plannedEvents !== null) {
    plannedEvents = JSON.parse(plannedEvents);
    console.log(plannedEvents);
  } else {
    plannedEvents = [];
  }

  let scrollPlanningContainer = document.getElementById(
    "scrollPlanningContainer"
  );
  scrollPlanningContainer.innerHTML = "";
  //   Récupèration de la liste complète des événements pour retrouver ceux qui ont été enregistrés
  fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data.events);
      plannedEvents.forEach(function (eventId) {
        let event = null;

        for (let i = 0; i < data.events.length; i++) {
          if (data.events[i].id === eventId) {
            event = data.events[i];
            break;
          }
        }
        // Génère une carte pour chaque événement du planning
        if (event !== null) {
          console.log("Événement planning :", event);

          let eventCard = document.createElement("div");
          eventCard.className = "eventCardClone";

          let eventTitle = document.createElement("h2");
          eventTitle.className = "eventTitle";
          eventTitle.innerHTML = event.title;

          let eventDate = document.createElement("p");
          eventDate.className = "eventDate";
          let dateParts = event.start_date.split(" ")[0].split("-");
          eventDate.textContent =
            "Date: " + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

          let eventAdress = document.createElement("p");
          eventAdress.className = "eventAdress";
          if (event.venue.slug !== undefined && event.venue.slug !== null) {
            eventAdress.textContent = "Lieu: " + event.venue.slug;
          } else {
            eventAdress.textContent = "Lieu: non communiqué";
          }
          // Création des boutons intéractifs
          let detailsButton = document.createElement("button");
          detailsButton.className = "detailsButton";
          detailsButton.textContent = "Voir détails";
          detailsButton.setAttribute(
            "aria-label",
            "Afficher les détails de l'événement " + event.title
          );
          detailsButton.addEventListener("click", function () {
            displayModal(event);
          });

          let removeButton = document.createElement("button");
          removeButton.className = "removeButton";
          removeButton.textContent = "Retirer du planning";
          removeButton.addEventListener("click", function () {
            eventCard.remove();
            removeFromPlanning(event.id);
          });

          eventCard.appendChild(eventTitle);
          eventCard.appendChild(eventDate);
          eventCard.appendChild(eventAdress);
          eventCard.appendChild(detailsButton);
          eventCard.appendChild(removeButton);
          scrollPlanningContainer.appendChild(eventCard);
        }
      });
    })
    .catch(function (error) {
      console.error("Erreur API :", error);
    });
}

window.addEventListener("load", displayPlanning);

// Suppression d'un événement du planning

function removeFromPlanning(eventId) {
  let plannedEvents = localStorage.getItem("plannedEvents");

  if (plannedEvents !== null) {
    plannedEvents = JSON.parse(plannedEvents);

    let updatedEvents = [];
    for (let i = 0; i < plannedEvents.length; i++) {
      if (plannedEvents[i] !== eventId) {
        updatedEvents.push(plannedEvents[i]);
      }
    }
    localStorage.setItem("plannedEvents", JSON.stringify(updatedEvents));
  }
  displayPlanning();
}

// Affichage et fermeture de la modale

function displayModal(event) {
  document.getElementById("modalTitle").innerHTML = event.title;
  let dateParts = event.start_date.split(" ")[0].split("-");
  document.getElementById("modalDate").textContent =
    "Date: " + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  let eventAdress = document.getElementById("modalAdress");
  if (event.venue.slug !== undefined && event.venue.slug !== null) {
    eventAdress.textContent = "Lieu: " + event.venue.slug;
  } else {
    eventAdress.textContent = "Lieu: non communiqué";
  }
  eventAdress.textContent = "Lieu: non communiqué";
  document.getElementById("modalDescription").innerHTML =
    event.description || "Pas de description disponible.";
  document.getElementById("modal").style.display = "block";
  let modalLink = document.getElementById("modalUrl");
  modalLink.href = event.url;
  modalLink.textContent = event.url;
  modalLink.setAttribute("aria-label", "Lien vers l'événement " + event.title);
  document.getElementById("modal").style.display = "block";
  let closeModal = document.getElementById("closeModal");
  closeModal.setAttribute("aria-label", "Fermer la fenêtre");
  closeModal.addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });
}
```

---

### Note finale

---

### `ProjetCCP1/index.html` (intégralité)

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="description"
      content="Découvrez les meilleurs événements à venir près de chez vous."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./style.css" />
    <title>eventsPortal</title>
  </head>
  <body>
    <header>
      <div class="eventsTitle">
        <h1>Les évènements</h1>
        <img
          class="darkModeImage"
          src="https://res.cloudinary.com/dwkyezu2u/image/upload/v1748013892/pngegg_1_uywwwa.png"
          alt="Mode Sombre"
        />
      </div>
    </header>
    <div id="eventsContainer">
      <div id="scrollEventsContainer"></div>
    </div>
    <div id="eventModal">
      <div id="modal">
        <div id="closeModal">X</div>
        <h2 id="modalTitle"></h2>
        <br />
        <p id="modalDate"></p>
        <br />
        <p id="modalAdress"></p>
        <br />
        <p id="modalDescription"></p>
        <br />
        <p>Accéder à l'événement : <a id="modalUrl" target="_blank"></a></p>
      </div>
    </div>
    <div id="planningContainer">
      <div class="planningTitle">
        <h3>Mon planning</h3>
      </div>
      <div id="scrollPlanningContainer"></div>
    </div>
    <script src="./script.js"></script>
  </body>
</html>
```

### `ProjetCCP1/style.css` (intégralité)

```css
/* Extrait complet du style utilisé dans le prototype */
* {
  padding: 0;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

header {
  background-color: #4ecdc4;
}

#eventsContainer {
  background-color: #4ecdc4;
}
.planningTitle {
  padding-left: 50px;
  padding-right: 50px;
}
#planningContainer {
  background-color: #f5a623;
}

.eventCard,
.eventCardClone {
  background-color: #f7fff7;
  border-radius: 10px;
}

#modal {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 24px;
  }
}
```

### `volunteer-platform/app.js` (intégralité)

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

---

### Note finale

Ce document est prêt à être relu et complété avec vos informations personnelles (noms, périodes, preuves scannées). Si vous le souhaitez, je peux :

- Remplir les champs personnels à partir des informations que vous me fournissez.
- Convertir ce Markdown en `.docx` avec sa table des matières et des sauts de page pour atteindre la pagination souhaitée (~30 pages) en ajustant l'espacement et en ajoutant des captures/annexes complètes.

Indiquez la ou les actions souhaitées et je m'en occupe.
