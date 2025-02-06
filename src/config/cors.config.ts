/**
 * Configuración de CORS para la aplicación.
 *
 * Esta función retorna un objeto con la configuración de CORS, permitiendo
 * solicitudes desde el origen especificado y definiendo los métodos y 
 * encabezados permitidos.
 *
 * @returns {Object} Configuración de CORS.
 * @property {string} origin - El origen permitido para las solicitudes CORS.
 * @property {string} methods - Métodos HTTP permitidos.
 * @property {string[]} allowedHeaders - Encabezados permitidos en las solicitudes.
 */
export function corsConfig(): object {
    return {
        origin: 'http://localhost:5173', // Origen permitido
        methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
        allowedHeaders: ['Content-Type', 'Authorization', 'Bearer'], // Encabezados permitidos
    };
}
