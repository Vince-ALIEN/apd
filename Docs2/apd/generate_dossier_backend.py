from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Créer présentation A4 vertical (210x297mm = 8.27x11.69 inches)
prs = Presentation()
prs.slide_width = Inches(8.27)
prs.slide_height = Inches(11.69)

# Couleurs modernes
COLOR_PRIMARY = RGBColor(26, 115, 232)  # Bleu moderne
COLOR_SECONDARY = RGBColor(52, 168, 83)  # Vert
COLOR_ACCENT = RGBColor(234, 67, 53)  # Rouge accent
COLOR_DARK = RGBColor(32, 33, 36)  # Gris foncé
COLOR_LIGHT = RGBColor(248, 249, 250)  # Gris clair
COLOR_TEXT = RGBColor(60, 64, 67)  # Gris texte

def add_title_slide(title, subtitle=""):
    """Crée une slide de titre moderne"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    # Fond dégradé simulé avec formes
    bg1 = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(5.85)
    )
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_SECONDARY
    bg1.line.fill.background()
    
    bg2 = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(5.85),
        Inches(8.27), Inches(5.84)
    )
    bg2.fill.solid()
    bg2.fill.fore_color.rgb = COLOR_DARK
    bg2.line.fill.background()
    
    # Accent décoratif
    accent = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.5), Inches(4.5),
        Inches(1), Inches(0.15)
    )
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_ACCENT
    accent.line.fill.background()
    
    # Titre
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(2.5),
        Inches(7.27), Inches(2.5)
    )
    title_frame = title_box.text_frame
    title_frame.word_wrap = True
    title_frame.vertical_anchor = 1  # Middle
    p = title_frame.paragraphs[0]
    p.text = title
    p.font.name = 'Segoe UI'
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.alignment = PP_ALIGN.CENTER
    p.line_spacing = 1.2
    
    # Sous-titre
    if subtitle:
        subtitle_box = slide.shapes.add_textbox(
            Inches(0.8), Inches(7),
            Inches(6.67), Inches(2)
        )
        subtitle_frame = subtitle_box.text_frame
        subtitle_frame.word_wrap = True
        for i, line in enumerate(subtitle.split('\n')):
            if i > 0:
                p = subtitle_frame.add_paragraph()
            else:
                p = subtitle_frame.paragraphs[0]
            p.text = line
            p.font.name = 'Segoe UI Light'
            p.font.size = Pt(16)
            p.font.color.rgb = RGBColor(255, 255, 255)
            p.alignment = PP_ALIGN.CENTER
            p.space_after = Pt(8)
    
    return slide

def add_content_slide(title, content_items, color=None):
    """Crée une slide avec titre et contenu moderne"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    if color is None:
        color = COLOR_SECONDARY
    
    # Barre de titre
    title_shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(1)
    )
    title_shape.fill.solid()
    title_shape.fill.fore_color.rgb = color
    title_shape.line.fill.background()
    
    # Accent
    accent = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0.95),
        Inches(8.27), Inches(0.05)
    )
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_ACCENT
    accent.line.fill.background()
    
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(7.27), Inches(0.6)
    )
    title_frame = title_box.text_frame
    title_frame.vertical_anchor = 1
    p = title_frame.paragraphs[0]
    p.text = title
    p.font.name = 'Segoe UI Semibold'
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    
    # Contenu
    content_box = slide.shapes.add_textbox(
        Inches(0.6), Inches(1.3),
        Inches(7.07), Inches(10)
    )
    text_frame = content_box.text_frame
    text_frame.word_wrap = True
    
    for i, item in enumerate(content_items):
        if i > 0:
            p = text_frame.add_paragraph()
        else:
            p = text_frame.paragraphs[0]
        
        if isinstance(item, dict):
            p.text = item.get('text', '')
            p.level = item.get('level', 0)
            p.font.name = 'Courier New' if item.get('code', False) else 'Segoe UI'
            p.font.size = Pt(item.get('size', 13))
            p.font.color.rgb = item.get('color', COLOR_TEXT)
            if item.get('bold', False):
                p.font.bold = True
        else:
            p.text = item
            p.font.name = 'Segoe UI'
            p.font.size = Pt(13)
            p.font.color.rgb = COLOR_TEXT
            p.level = 0
        
        p.space_after = Pt(8)
    
    return slide

def add_code_slide(title, code_text, description=""):
    """Crée une slide avec du code - style moderne"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    # Barre de titre
    title_shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(1)
    )
    title_shape.fill.solid()
    title_shape.fill.fore_color.rgb = COLOR_DARK
    title_shape.line.fill.background()
    
    # Accent
    accent = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0.95),
        Inches(8.27), Inches(0.05)
    )
    accent.fill.solid()
    accent.fill.fore_color.rgb = COLOR_SECONDARY
    accent.line.fill.background()
    
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(0.2),
        Inches(7.27), Inches(0.6)
    )
    title_frame = title_box.text_frame
    title_frame.vertical_anchor = 1
    p = title_frame.paragraphs[0]
    p.text = title
    p.font.name = 'Segoe UI Semibold'
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    
    # Description
    y_pos = 1.2
    if description:
        desc_box = slide.shapes.add_textbox(
            Inches(0.6), Inches(y_pos),
            Inches(7.07), Inches(1)
        )
        desc_frame = desc_box.text_frame
        desc_frame.word_wrap = True
        p = desc_frame.paragraphs[0]
        p.text = description
        p.font.name = 'Segoe UI'
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_TEXT
        p.font.italic = True
        y_pos += 0.9
    
    # Bloc de code style VS Code
    code_box = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        Inches(0.6), Inches(y_pos),
        Inches(7.07), Inches(11.69 - y_pos - 0.5)
    )
    code_box.fill.solid()
    code_box.fill.fore_color.rgb = RGBColor(30, 30, 30)
    code_box.line.color.rgb = RGBColor(60, 60, 60)
    code_box.line.width = Pt(1)
    
    code_text_box = slide.shapes.add_textbox(
        Inches(0.75), Inches(y_pos + 0.15),
        Inches(6.77), Inches(11.69 - y_pos - 0.8)
    )
    code_frame = code_text_box.text_frame
    code_frame.word_wrap = True
    p = code_frame.paragraphs[0]
    p.text = code_text
    p.font.name = 'Consolas'
    p.font.size = Pt(9)
    p.font.color.rgb = RGBColor(212, 212, 212)
    p.line_spacing = 1.1
    
    return slide

def add_section_divider(section_title, section_number):
    """Crée une slide de séparation de section"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    
    # Fond
    bg = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(0),
        Inches(8.27), Inches(11.69)
    )
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_DARK
    bg.line.fill.background()
    
    # Bande de couleur
    band = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        Inches(0), Inches(5),
        Inches(8.27), Inches(1.69)
    )
    band.fill.solid()
    band.fill.fore_color.rgb = COLOR_SECONDARY
    band.line.fill.background()
    
    # Numéro de section
    number_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(3),
        Inches(7.27), Inches(1.5)
    )
    number_frame = number_box.text_frame
    p = number_frame.paragraphs[0]
    p.text = f"0{section_number}"
    p.font.name = 'Segoe UI Light'
    p.font.size = Pt(120)
    p.font.color.rgb = RGBColor(80, 80, 80)
    p.alignment = PP_ALIGN.CENTER
    
    # Titre de section
    title_box = slide.shapes.add_textbox(
        Inches(0.5), Inches(5.3),
        Inches(7.27), Inches(1)
    )
    title_frame = title_box.text_frame
    title_frame.vertical_anchor = 1
    p = title_frame.paragraphs[0]
    p.text = section_title
    p.font.name = 'Segoe UI'
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)
    p.alignment = PP_ALIGN.CENTER
    
    return slide

# ============= SLIDES BACKEND =============

# Slide 1: Page de garde
add_title_slide(
    "DOSSIER PROJET\nTITRE PROFESSIONNEL\nDÉVELOPPEUR WEB ET WEB MOBILE",
    "PARTIE 2 : DÉVELOPPEMENT BACKEND\n\nPhilippe BARBOSA\nNovembre 2025"
)

# Slide 2: Introduction Backend
add_content_slide(
    "Développement Backend - CoolBooking",
    [
        {'text': '🎯 Contexte du projet backend', 'size': 16, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Pour la partie backend de ce dossier, j'utilise le projet CoolBooking avec une base de données relationnelle MariaDB.", 'size': 13},
        '',
        {'text': '💡 Pourquoi CoolBooking pour le backend ?', 'size': 16, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Le projet APD (stage) utilise Strapi qui génère automatiquement l'API REST. Pour démontrer ma capacité à développer un backend complet de A à Z, j'ai choisi de présenter CoolBooking où j'ai implémenté :", 'size': 13},
        {'text': "→ Architecture backend Express personnalisée", 'size': 12, 'level': 1},
        {'text': "→ Base de données relationnelle MariaDB avec modélisation", 'size': 12, 'level': 1},
        {'text': "→ Système d'authentification JWT complet", 'size': 12, 'level': 1},
        {'text': "→ Repository pattern pour l'abstraction des données", 'size': 12, 'level': 1},
        {'text': "→ Validation des données avec Joi", 'size': 12, 'level': 1},
        {'text': "→ Upload de fichiers avec Cloudinary", 'size': 12, 'level': 1},
        '',
        {'text': '📋 Rappel du projet', 'size': 16, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Plateforme de location immobilière mettant en relation propriétaires et locataires.", 'size': 13},
        {'text': "Fonctionnalités : Authentification, Gestion annonces, Upload images, Messagerie, Favoris.", 'size': 13},
    ]
)

# Slide 3: Séparateur Architecture
add_section_divider("ARCHITECTURE BACKEND", 1)

# Slide 4: Stack technique backend
add_content_slide(
    "Stack Technique Backend",
    [
        {'text': '🛠️ Technologies et outils utilisés', 'size': 17, 'bold': True},
        '',
        {'text': 'Express.js 5', 'size': 15, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Framework Node.js minimaliste et flexible", 'size': 12},
        {'text': "Gestion des routes, middlewares et controllers", 'size': 12},
        '',
        {'text': 'MariaDB', 'size': 15, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Base de données relationnelle (fork de MySQL)", 'size': 12},
        {'text': "Pilote mysql2 pour Node.js avec Promises", 'size': 12},
        {'text': "Connection pooling pour les performances", 'size': 12},
        '',
        {'text': 'JWT (JSON Web Tokens)', 'size': 15, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Authentification stateless avec tokens", 'size': 12},
        {'text': "Stockage sécurisé dans cookies HttpOnly", 'size': 12},
        '',
        {'text': 'Argon2', 'size': 15, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Algorithme de hachage moderne pour les mots de passe", 'size': 12},
        {'text': "Plus sécurisé que bcrypt (vainqueur Password Hashing Competition)", 'size': 12},
        '',
        {'text': 'Joi', 'size': 15, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Validation des données côté serveur", 'size': 12},
        {'text': "Schemas de validation réutilisables", 'size': 12},
        '',
        {'text': 'Cloudinary + Multer', 'size': 15, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "Upload et stockage d'images dans le cloud", 'size': 12},
        {'text': "Multer pour la gestion multipart/form-data", 'size': 12},
    ],
    COLOR_DARK
)

# Slide 5: Architecture générale
add_content_slide(
    "Architecture Backend - Organisation",
    [
        {'text': "📁 Structure du projet backend", 'size': 16, 'bold': True},
        {'text': "J'ai organisé le backend selon le pattern MVC + Repository :", 'size': 13},
        '',
        {'text': 'back-coolbooking-mariaDB/', 'size': 13, 'bold': True, 'code': True},
        {'text': '├── app.js                    → Point d\'entrée', 'size': 11, 'code': True, 'level': 1},
        {'text': '├── routes/', 'size': 11, 'code': True, 'level': 1},
        {'text': '│   ├── users.router.js       → Routes utilisateurs', 'size': 11, 'code': True, 'level': 2},
        {'text': '│   └── rentals.router.js     → Routes annonces', 'size': 11, 'code': True, 'level': 2},
        {'text': '├── users/', 'size': 11, 'code': True, 'level': 1},
        {'text': '│   ├── users.controller.js   → Logique métier', 'size': 11, 'code': True, 'level': 2},
        {'text': '│   ├── users.service.js      → Services métier', 'size': 11, 'code': True, 'level': 2},
        {'text': '│   └── users.repository.js   → Accès base de données', 'size': 11, 'code': True, 'level': 2},
        {'text': '├── rentals/', 'size': 11, 'code': True, 'level': 1},
        {'text': '│   ├── rentals.controller.js', 'size': 11, 'code': True, 'level': 2},
        {'text': '│   ├── rentals.service.js', 'size': 11, 'code': True, 'level': 2},
        {'text': '│   └── rentals.repository.js', 'size': 11, 'code': True, 'level': 2},
        {'text': '├── authentication/', 'size': 11, 'code': True, 'level': 1},
        {'text': '│   └── authentication.js     → JWT & Argon2', 'size': 11, 'code': True, 'level': 2},
        {'text': '├── validation/', 'size': 11, 'code': True, 'level': 1},
        {'text': '│   └── users.validation.js   → Schemas Joi', 'size': 11, 'code': True, 'level': 2},
        {'text': '└── config/', 'size': 11, 'code': True, 'level': 1},
        {'text': '    ├── db.js                 → Connexion MariaDB', 'size': 11, 'code': True, 'level': 2},
        {'text': '    └── cloudinary.js         → Config Cloudinary', 'size': 11, 'code': True, 'level': 2},
    ]
)

# Slide 6: Point d'entrée app.js
add_code_slide(
    "Point d'Entrée - app.js",
    """// app.js
import dotenv from "dotenv";
import express from "express";
import users_router from "./routes/users.router.js";
import rentals_router from "./routes/rentals.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/users", users_router);
app.use("/rentals", rentals_router);

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error("Erreur attrapée :", err.message);
  res.status(400).json({ message: err.message });
});

app.listen(port, () => {
  console.log("localhost connected");
});""",
    "J'ai structuré le serveur Express avec une configuration claire : middlewares globaux, routes modulaires et gestion d'erreurs centralisée."
)

# Slide 7: Séparateur Base de données
add_section_divider("BASE DE DONNÉES MARIADB", 2)

# Slide 8: Configuration base de données
add_code_slide(
    "Configuration Base de Données",
    """// config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Connection pool pour optimiser les performances
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// Fonction utilitaire pour toutes les requêtes SQL
export async function query(sql, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connexion à la base établie avec succès");

    const [rows] = await conn.query(sql, params);
    return [rows];
  } catch (err) {
    console.error(
      "Erreur lors de la connexion ou de la requête :",
      err.message
    );
    throw err;
  } finally {
    if (conn) conn.release();
  }
}""",
    "J'ai créé un pool de connexions pour optimiser les performances et une fonction query() réutilisable pour toutes les opérations SQL."
)

# Slide 9: Modélisation base de données
add_content_slide(
    "Modélisation Base de Données",
    [
        {'text': '📊 Schéma de la base de données', 'size': 16, 'bold': True},
        '',
        {'text': 'Table users :', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': 'id (INT, AUTO_INCREMENT, PRIMARY KEY)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'avatar (VARCHAR) - URL Cloudinary', 'size': 11, 'code': True, 'level': 1},
        {'text': 'role (ENUM: owner, tenant)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'name (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'firstname (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'phone (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'email (VARCHAR, UNIQUE)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'password (VARCHAR) - Hash Argon2', 'size': 11, 'code': True, 'level': 1},
        {'text': 'created_at (TIMESTAMP)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'updated_at (TIMESTAMP)', 'size': 11, 'code': True, 'level': 1},
        '',
        {'text': 'Table rentals :', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': 'id (INT, AUTO_INCREMENT, PRIMARY KEY)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'owner_id (INT, FOREIGN KEY → users.id)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'title (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'description (TEXT)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'address, city, zip_code (VARCHAR)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'price (DECIMAL)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'beds (INT)', 'size': 11, 'code': True, 'level': 1},
        {'text': 'images (JSON) - URLs Cloudinary', 'size': 11, 'code': True, 'level': 1},
        {'text': 'created_at, updated_at (TIMESTAMP)', 'size': 11, 'code': True, 'level': 1},
    ]
)

# Slide 10: Repository Pattern
add_content_slide(
    "Repository Pattern - Principe",
    [
        {'text': '🏗️ Architecture en couches', 'size': 16, 'bold': True},
        '',
        {'text': "J'ai implémenté le Repository Pattern pour séparer la logique métier de l'accès aux données :", 'size': 13},
        '',
        {'text': '1. Controller (users.controller.js)', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "→ Gère les requêtes HTTP et les réponses", 'size': 12, 'level': 1},
        {'text': "→ Valide les données avec Joi", 'size': 12, 'level': 1},
        {'text': "→ Appelle les services métier", 'size': 12, 'level': 1},
        '',
        {'text': '2. Service (users.service.js)', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "→ Contient la logique métier", 'size': 12, 'level': 1},
        {'text': "→ Appelle le repository pour les données", 'size': 12, 'level': 1},
        {'text': "→ Transforme/enrichit les données", 'size': 12, 'level': 1},
        '',
        {'text': '3. Repository (users.repository.js)', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "→ Abstraction de l'accès aux données", 'size': 12, 'level': 1},
        {'text': "→ Exécute les requêtes SQL", 'size': 12, 'level': 1},
        {'text': "→ Retourne des objets JavaScript", 'size': 12, 'level': 1},
        '',
        {'text': '✅ Avantages :', 'size': 14, 'bold': True},
        {'text': "• Séparation des responsabilités (Single Responsibility Principle)", 'size': 12},
        {'text': "• Testabilité accrue (mock des repositories)", 'size': 12},
        {'text': "• Maintenance facilitée (changement de BDD plus simple)", 'size': 12},
    ]
)

# Slide 11: Repository Users
add_code_slide(
    "Repository Pattern - users.repository.js",
    """// users/users.repository.js
import { query } from "../config/db.js";

const validRoles = ["owner", "tenant"];

class UserRepository {
  async getAllUsers() {
    const [rows] = await query(
      "SELECT id, avatar, role, name, firstname, phone, email FROM users"
    );
    return rows;
  }

  async getUserById(id) {
    const [rows] = await query(
      "SELECT id, avatar, role, name, firstname, phone, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async createUser({ avatar, role, name, firstname, phone, email, password }) {
    // Vérification email unique
    const [existing] = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) throw new Error("Email déjà utilisé");

    const [result] = await query(
      "INSERT INTO users (avatar, role, name, firstname, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [avatar, role, name, firstname, phone, email, password]
    );

    return {
      id: Number(result.insertId),
      avatar, role, name, firstname, phone, email,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  async updateUser(id, update) {
    const fields = [];
    const values = [];

    for (const key in update) {
      fields.push(`${key} = ?`);
      values.push(update[key]);
    }
    values.push(id);

    const [result] = await query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return result.affectedRows ? await this.getUserById(id) : null;
  }

  async deleteUser(id) {
    const [result] = await query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default new UserRepository();""",
    "Le repository encapsule toutes les opérations SQL liées aux utilisateurs. Il utilise des requêtes paramétrées pour éviter les injections SQL."
)

# Slide 12: Séparateur Authentification
add_section_divider("AUTHENTIFICATION & SÉCURITÉ", 3)

# Slide 13: Authentification JWT
add_code_slide(
    "Authentification JWT - Connexion",
    """// authentication/authentication.js
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { query } from "../config/db.js";

// Vérifie les identifiants et renvoie un token + infos utilisateur
export async function verifyPassword(req, res) {
  try {
    const { email, password } = req.body;

    const [rows] = await query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe avec Argon2
    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Envoi du token dans un cookie HttpOnly (protection XSS)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Réponse avec les infos utilisateur (sans mot de passe)
    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Erreur dans verifyPassword :", err.message);
    res.status(500).json({ message: "Erreur interne" });
  }
}""",
    "J'ai implémenté l'authentification avec JWT stocké dans un cookie HttpOnly pour se protéger contre les attaques XSS. Le mot de passe est vérifié avec Argon2."
)

# Slide 14: Middleware de vérification JWT
add_code_slide(
    "Middleware de Protection - verifyToken",
    """// authentication/authentication.js (suite)

// Vérifie le token JWT dans les cookies
export async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Accès interdit, token manquant.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await query("SELECT firstname FROM users WHERE id = ?", [
      decoded.id,
    ]);
    const user = rows[0];

    if (!user) {
      return res.status(401).send("Utilisateur non trouvé ou supprimé.");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token :", err.message);
    return res.status(403).send("Token invalide ou expiré.");
  }
}

// Déconnecte l'utilisateur en supprimant le cookie
export async function clearCookie(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).send("Utilisateur déconnecté");
}""",
    "Le middleware verifyToken protège les routes privées en vérifiant la validité du JWT. Il attache les infos utilisateur à l'objet req pour les routes suivantes."
)

# Slide 15: Validation avec Joi
add_code_slide(
    "Validation des Données - Joi",
    """// validation/users.validation.js
import Joi from "joi";

const validRoles = ["owner", "tenant"];

export const createUserSchema = Joi.object({
  avatar: Joi.string().uri().optional().messages({
    "string.uri": "L'URL de l'avatar n'est pas valide",
  }),

  role: Joi.string()
    .valid(...validRoles)
    .required()
    .messages({
      "any.required": "Le rôle est requis",
      "any.only": `Le rôle doit être soit : ${validRoles.join(" ou ")}`,
    }),

  name: Joi.string().min(2).max(30).required().messages({
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "any.required": "Le nom est requis",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "L'adresse e-mail doit être valide",
    "any.required": "L'e-mail est requis",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est requis",
  }),

  confirmpassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Les mots de passe doivent correspondre",
  }),
});""",
    "J'ai créé des schemas Joi réutilisables pour valider les données côté serveur. Joi permet de définir des règles complexes avec des messages d'erreur personnalisés."
)

# Slide 16: Controller avec validation
add_code_slide(
    "Controller - users.controller.js",
    """// users/users.controller.js
import userService from "./users.service.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { createUserSchema, updateUserSchema } from "../validation/users.validation.js";

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = async (req, res, next) => {
    try {
      // Validation Joi
      const { error } = createUserSchema.validate(req.body);
      if (error) throw new Error("Validation échouée : " + error.details[0].message);

      let avatarUrl;

      // Upload avatar sur Cloudinary si présent
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "avatars",
          transformation: [{ width: 300, height: 300, crop: "fill" }],
        });
        avatarUrl = result.secure_url;
        fs.unlinkSync(req.file.path); // Supprimer fichier temporaire
      } else {
        avatarUrl = "https://res.cloudinary.com/.../default.png";
      }

      const userData = {
        ...req.body,
        avatar: avatarUrl,
      };

      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // Autres méthodes: getAllUsers, getUserById, updateUser, deleteUser...
}

export default new UserController(userService);""",
    "Le controller valide les données avec Joi, gère l'upload d'images sur Cloudinary, puis délègue la création au service."
)

# Slide 17: Routes utilisateurs
add_code_slide(
    "Routes - users.router.js",
    """// routes/users.router.js
import express from "express";
import multer from "multer";
import userController from "../users/users.controller.js";
import {
  verifyToken,
  verifyPassword,
  clearCookie,
} from "../authentication/authentication.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // stockage temporaire

// Route protégée - nécessite authentification
router.get("/dashboard", verifyToken, (req, res) => {
  res.send(`Bienvenue dans votre espace, ${req.user.firstname}`);
});

// Routes publiques
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register", upload.single("avatar"), userController.createUser);
router.post("/login", upload.none(), verifyPassword);
router.post("/logout", clearCookie);

// Routes protégées
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;""",
    "J'ai organisé les routes avec des middlewares : multer pour les uploads, verifyToken pour protéger les routes privées."
)

# Slide 18: Upload Cloudinary
add_content_slide(
    "Upload de Fichiers - Cloudinary",
    [
        {'text': '☁️ Gestion des images', 'size': 16, 'bold': True},
        '',
        {'text': 'Architecture de l\'upload :', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "1. Multer reçoit le fichier (multipart/form-data)", 'size': 12},
        {'text': "2. Stockage temporaire dans /uploads/", 'size': 12},
        {'text': "3. Upload vers Cloudinary avec transformations", 'size': 12},
        {'text': "4. Suppression du fichier temporaire", 'size': 12},
        {'text': "5. Stockage de l'URL Cloudinary en base de données", 'size': 12},
        '',
        {'text': 'Avantages Cloudinary :', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ CDN mondial pour chargement rapide", 'size': 12},
        {'text': "✓ Transformations automatiques (resize, crop, format)", 'size': 12},
        {'text': "✓ Optimisation automatique des images (compression, WebP)", 'size': 12},
        {'text': "✓ Pas de stockage sur le serveur", 'size': 12},
        {'text': "✓ URL HTTPS sécurisées", 'size': 12},
        '',
        {'text': 'Exemple d\'URL générée :', 'size': 14, 'bold': True},
        {'text': 'https://res.cloudinary.com/dwkyezu2u/image/upload/', 'size': 10, 'code': True},
        {'text': 'v1745506223/avatars/user_123.jpg', 'size': 10, 'code': True},
    ]
)

# Slide 19: Sécurité
add_content_slide(
    "Sécurité Backend - Bonnes Pratiques",
    [
        {'text': '🔒 Mesures de sécurité implémentées', 'size': 16, 'bold': True},
        '',
        {'text': '1. Protection des mots de passe', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Hachage Argon2 (algorithme moderne et sécurisé)", 'size': 12},
        {'text': "✓ Jamais de mot de passe en clair en base", 'size': 12},
        {'text': "✓ Jamais de mot de passe renvoyé dans les réponses API", 'size': 12},
        '',
        {'text': '2. Authentification JWT', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Tokens stockés dans cookies HttpOnly (protection XSS)", 'size': 12},
        {'text': "✓ SameSite: Strict (protection CSRF)", 'size': 12},
        {'text': "✓ Secure: true en production (HTTPS uniquement)", 'size': 12},
        {'text': "✓ Expiration limitée (1 jour)", 'size': 12},
        '',
        {'text': '3. Injection SQL', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Requêtes paramétrées (prepared statements)", 'size': 12},
        {'text': "✓ Jamais de concaténation de strings SQL", 'size': 12},
        '',
        {'text': '4. Validation des données', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Validation Joi côté serveur (jamais faire confiance au client)", 'size': 12},
        {'text': "✓ Vérification des types et formats", 'size': 12},
        {'text': "✓ Contraintes d'unicité (email) en base", 'size': 12},
        '',
        {'text': '5. Variables d\'environnement', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Secrets dans .env (JWT_SECRET, DB credentials)", 'size': 12},
        {'text': "✓ .env exclu de Git (.gitignore)", 'size': 12},
    ]
)

# Slide 20: Compétences Backend
add_content_slide(
    "Compétences Backend Démontrées",
    [
        {'text': '✅ Attendus TP DWWM - Backend (Projet CoolBooking)', 'size': 17, 'bold': True},
        '',
        {'text': '1. Créer une base de données', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Modélisation relationnelle (users, rentals, relations)", 'size': 12},
        {'text': "✓ MariaDB avec types appropriés et contraintes", 'size': 12},
        {'text': "✓ Clés primaires, étrangères, index", 'size': 12},
        '',
        {'text': '2. Développer les composants d\'accès aux données', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Repository pattern pour abstraction des données", 'size': 12},
        {'text': "✓ Requêtes SQL paramétrées (sécurité injection)", 'size': 12},
        {'text': "✓ Connection pooling pour performances", 'size': 12},
        {'text': "✓ Gestion des erreurs et transactions", 'size': 12},
        '',
        {'text': '3. Développer une interface utilisateur web dynamique', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ API REST complète (CRUD utilisateurs et annonces)", 'size': 12},
        {'text': "✓ Architecture MVC + Repository", 'size': 12},
        {'text': "✓ Middlewares Express (auth, validation, upload)", 'size': 12},
        '',
        {'text': '4. Mettre en œuvre la sécurité', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Authentification JWT avec cookies HttpOnly", 'size': 12},
        {'text': "✓ Hachage Argon2 pour mots de passe", 'size': 12},
        {'text': "✓ Validation des données (Joi)", 'size': 12},
        {'text': "✓ Protection CORS, XSS, CSRF, injection SQL", 'size': 12},
    ]
)

# Slide 21: Bilan Backend
add_content_slide(
    "Bilan - Partie Backend",
    [
        {'text': '🎯 Objectifs atteints', 'size': 17, 'bold': True},
        '',
        {'text': 'Backend CoolBooking (MariaDB) :', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ API REST complète et fonctionnelle", 'size': 12},
        {'text': "✓ Base de données relationnelle bien modélisée", 'size': 12},
        {'text': "✓ Authentification JWT sécurisée", 'size': 12},
        {'text': "✓ Architecture propre et maintenable (Repository pattern)", 'size': 12},
        {'text': "✓ Upload d'images avec Cloudinary", 'size': 12},
        '',
        {'text': '💪 Points forts démontrés', 'size': 17, 'bold': True},
        {'text': "• Maîtrise de Node.js/Express", 'size': 12},
        {'text': "• Compétence en SQL et bases de données relationnelles", 'size': 12},
        {'text': "• Mise en œuvre de la sécurité (JWT, Argon2, validation)", 'size': 12},
        {'text': "• Architecture logicielle (separation of concerns)", 'size': 12},
        {'text': "• Code propre et bien documenté", 'size': 12},
        '',
        {'text': '📚 Apprentissages clés', 'size': 17, 'bold': True},
        {'text': "• Repository pattern pour abstraction des données", 'size': 12},
        {'text': "• Sécurité backend (authentification, validation, protection)", 'size': 12},
        {'text': "• Gestion des fichiers et upload cloud", 'size': 12},
        {'text': "• Bonnes pratiques REST API", 'size': 12},
        '',
        {'text': '🔄 Perspectives d\'amélioration', 'size': 17, 'bold': True},
        {'text': "• Tests unitaires et intégration (Jest, Supertest)", 'size': 12},
        {'text': "• Documentation API (Swagger/OpenAPI)", 'size': 12},
        {'text': "• Mise en place de migrations de base de données", 'size': 12},
        {'text': "• Optimisations performance (cache Redis, indexation)", 'size': 12},
    ]
)

# Slide 22: Conclusion générale
add_content_slide(
    "Conclusion - Dossier Projet Complet",
    [
        {'text': '🎓 Synthèse des compétences TP DWWM', 'size': 17, 'bold': True},
        '',
        {'text': 'Frontend (Projet APD) :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Next.js 15, React 19, TailwindCSS", 'size': 12},
        {'text': "✓ Intégration Strapi CMS headless", 'size': 12},
        {'text': "✓ Optimisations performance (SSR, ISR, lazy loading)", 'size': 12},
        {'text': "✓ Responsive design et accessibilité", 'size': 12},
        '',
        {'text': 'Maquettage (Projet CoolBooking) :', 'size': 14, 'bold': True, 'color': COLOR_PRIMARY},
        {'text': "✓ Figma professionnel (wireframes, haute fidélité)", 'size': 12},
        {'text': "✓ Design system et composants réutilisables", 'size': 12},
        {'text': "✓ UX design et parcours utilisateurs", 'size': 12},
        '',
        {'text': 'Backend (Projet CoolBooking MariaDB) :', 'size': 14, 'bold': True, 'color': COLOR_SECONDARY},
        {'text': "✓ Express.js, MariaDB, Repository pattern", 'size': 12},
        {'text': "✓ Authentification JWT + Argon2", 'size': 12},
        {'text': "✓ Validation Joi, Upload Cloudinary", 'size': 12},
        {'text': "✓ Sécurité et bonnes pratiques", 'size': 12},
        '',
        {'text': '🚀 Prêt pour le métier', 'size': 16, 'bold': True},
        {'text': "Cette formation m'a permis d'acquérir les compétences techniques et méthodologiques pour exercer le métier de développeur web full-stack avec professionnalisme.", 'size': 13},
    ]
)

# Sauvegarde
prs.save('DOSSIER_TP_DWWM_BACKEND.pptx')
print("✅ Dossier Backend généré : DOSSIER_TP_DWWM_BACKEND.pptx")
print(f"📊 Nombre de slides : {len(prs.slides)}")
print("📐 Format : A4 vertical (210x297mm)")
print("🎨 Design moderne avec police Segoe UI")
print("💾 Extraits de code réels du projet CoolBooking MariaDB")
