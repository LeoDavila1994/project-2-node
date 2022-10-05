const multer = require("multer");
// const path = require("path");

// Este storage almacena las imagenes en disco (localmente en mi servidor/ ordenador / proyecto)

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const destPath = path.join(__dirname, "..", "img");
//     cb(null, destPath);
//   },
//   filename: function (req, file, cb) {
//     const [originalName, ext] =file.originalname.split(".");
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileName = `${originalName}-${uniqueSuffix}.${ext}`;
//     cb(null, fileName);
//   },
// });

// Este storage almacena las imagenes en memoria cuando se hace la peticion y despues las elimina de ahí
// esto nos sirve para guardarlas en firebase en la nube

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = { upload };
