/**
 * Normaliza un texto convirtiéndolo a minúsculas y eliminando espacios en blanco al inicio y al final.
 *
 * @param {string} text - Texto de entrada que se desea normalizar.
 * @returns {string} Texto normalizado en minúsculas y sin espacios innecesarios.
 *
 * @example
 * const result = normalizeText("  Hola Mundo  ");
 * console.log(result); // "hola mundo"
 */
export const normalizeText = (text: string): string => {
    return text.toLowerCase().trim();
};
