const multer = require("multer");
const path = require("path");

//upload immagini
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, "../uploads");
    console.log("Percorso di destinazione del file:", uploadPath);
    return cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log("Nome del file salvato:", filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = /jpeg|jpg|png|webp|gif/;
//   const mimetype = allowedFileTypes.test(file.mimetype);
//   const extname = allowedFileTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb(new Error("Error: File upload only supports images!"));
// };

// // Multer configuration
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 },
//   fileFilter: fileFilter,
// });

// module.exports = upload;
