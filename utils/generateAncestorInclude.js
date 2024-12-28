/**
 * Funzione che genera ricorsivamente l'include dei genitori
 * @param {Number} depth Numero di generazioni da includere
 * @returns {Object} Un oggetto che contiene ricorsivamente un campo include
 */
const generateAncestorInclude = (depth) => {
  if (depth === 0) return {};
  return {
    include: {
      breed: true,
      country: true,
      sire: generateAncestorInclude(depth - 1),
      dam: generateAncestorInclude(depth - 1),
      childrenAsDam: {
        include: {
          breed: true,
          country: true,
        },
      },
      childrenAsSire: {
        include: {
          breed: true,
          country: true,
        },
      },
    },
  };
};

module.exports = generateAncestorInclude;
