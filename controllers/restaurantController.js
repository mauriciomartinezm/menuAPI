import { pool } from "../server.js";

export const getRestaurants = async (req, res) => {
  console.log("Petición recibida en /getRestaurants");

  try {
    const [result] = await pool.query("SELECT * FROM Restaurante");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
