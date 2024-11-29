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
            dam: generateAncestorInclude(depth - 1)
        }
    };
};

module.exports = generateAncestorInclude;