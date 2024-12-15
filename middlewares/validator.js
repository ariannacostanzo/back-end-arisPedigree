const { checkSchema, validationResult } = require("express-validator");
const deletePic = require("../utils/deletePic");

module.exports = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          deletePic(req.file.filename);
        }
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
