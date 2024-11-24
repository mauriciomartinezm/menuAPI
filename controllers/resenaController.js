import { db } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid';

export const getResena = async (req, res) => {
  console.log("Petición recibida en /getResena");

  try {
    const [result] = await db.query("SELECT * FROM Resena");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getResenaId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Resena WHERE id_resena = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No existen registros" });
    }

    res.json(result);
  } catch (error) {
      if (!res.headersSent) {
          res.status(500).json({ message: error.message });
      }
  }
};

export const createResena = async (req, res) => {
  try {
      const { id_resena = uuidv4(), id_usuario, id_restaurante, calificacion, comentario} = req.body;
      const query = 'INSERT INTO Resena (id_resena, id_usuario, id_restaurante, calificacion, comentario) VALUES (?, ?, ?, ?, ?)';
      await db.query(query, [id_resena, id_usuario, id_restaurante, calificacion, comentario]);

      res.json({
        id_resena,
        id_usuario, 
        id_restaurante, 
        calificacion, 
        comentario, 
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateResena = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Resena SET ? WHERE id_resena = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encuentra registrado" });
    }

    res.json({ message: "Datos actualizados exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResena = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Resena WHERE id_resena = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encuentra registrado" });
    }

    res.json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
