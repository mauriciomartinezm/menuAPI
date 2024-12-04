import { createPool } from 'mysql2/promise';

export const db = createPool({
    host: "junction.proxy.rlwy.net",
    port: "58382",
    user: "root",
    password: "tzYosTfnagLAnCOzXxQLTcNbXdCGtxbJ",
    database: "railway",
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
