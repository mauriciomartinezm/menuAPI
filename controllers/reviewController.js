import { db } from "../database/db.js";

export const getReviews = async (req, res) => {
  console.log("Petición recibida en /getReviews");

  try {
    const [result] = await db.query("SELECT * FROM Reseña");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
export const makeReview = async (req, res) => {
  console.log("Petición recibida en /makeReview");
  console.log("Cuerpo de la petición: ", req.body);
  const { idUsuario, idRestaurante, calificacion, comentario } = req.body;

  if (!idUsuario || !idRestaurante || !calificacion) {
    return res.status(400).json({
      message: "Faltan datos obligatorios",
    });
  }
  try {
    const result = await db.query(
      "INSERT INTO Reseña(id_reseña, id_usuario, id_restaurante, calificacion, comentario) VALUES (UUID(), ?, ?, ?, ?)",
      [
        idUsuario,
        idRestaurante,
        calificacion,
        comentario,
        new Date().toISOString(),
      ]
    );
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};
