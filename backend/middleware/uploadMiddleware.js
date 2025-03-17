const multer = require("multer");

// Storage configuration
const storage = multer.memoryStorage(); // Store file in memory

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.mimetype.includes("spreadsheetml")) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and Excel files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
