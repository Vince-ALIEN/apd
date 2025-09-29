const fs = require("fs");
const path = require("path");

module.exports = {
  async afterCreate(event) {
    const uploadsDir = path.join(strapi.dirs.static.public, "uploads");

    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        strapi.log.warn("Erreur lecture dossier uploads :", err);
        return;
      }

      for (const file of files) {
        fs.unlink(path.join(uploadsDir, file), (err) => {
          if (err) {
            strapi.log.warn(`Erreur suppression fichier ${file} :`, err);
          } else {
            strapi.log.info(`🗑️ Fichier supprimé : ${file}`);
          }
        });
      }
    });
  },
};
