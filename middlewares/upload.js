const multer = require("multer");
const path = require("path");

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

//upload immagini
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage})

module.exports = upload;