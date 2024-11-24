import { db } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid';

export const getHorario = async (req, res) => {
  console.log("Petición recibida en /getHorario");

  try {
    const [result] = await db.query("SELECT * FROM Horario");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getHorarioId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Horario WHERE id_horario = ?",
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

export const createHorario = async (req, res) => {
  try {
      const { id_horario = uuidv4(), nombre } = req.body;
      const query = 'INSERT INTO Horario (id_horario, nombre) VALUES (?, ?)';
      await db.query(query, [id_horario, nombre]);

      res.json({
        id_horario,
        nombre,
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateHorario = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Horario SET ? WHERE id_horario = ?",
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

export const deleteHorario = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Horario WHERE id_horario = ?",
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
