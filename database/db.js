import { createPool } from 'mysql2/promise';

export const db = createPool({
    host: "b6737tipdo8cxkuodyo9-mysql.services.clever-cloud.com",
    port: "3306",
    user: "uhim7e19cwvekoxv",
    password: "UwYce5Nw2VF3UkEeDsi3",
    database: "b6737tipdo8cxkuodyo9",
});

// Para verificar la conexión
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log("Conexión exitosa a la base de datos.");
        connection.release(); // Libera la conexión al pool
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

testConnection();
