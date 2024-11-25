import { v4 as uuidv4 } from 'uuid';
import { db } from "../database/db.js";

export const getReserva = async (req, res) => {
  console.log("Petición recibida en /getReserva");

  try {
    const [result] = await db.query("SELECT * FROM Reserva");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getReservaId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Reserva WHERE id_reserva = ?",
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

export const createReserva = async (req, res) => {
  try {
      const { id_reserva = uuidv4(), id_usuario, id_restaurante, fecha_reserva, numero_personas, estado, comentario} = req.body;
      const query = 'INSERT INTO Reserva (id_reserva, id_usuario, id_restaurante, fecha_reserva, numero_personas, estado, comentario) VALUES (?, ?, ?, ?, ?, ?,?)';
      await db.query(query, [id_reserva, id_usuario, id_restaurante, fecha_reserva, numero_personas, estado, comentario]);

      res.json({
        id_reserva,
        id_usuario,
        id_restaurante,
        fecha_reserva,
        numero_personas,
        estado,
        comentario,
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateReserva = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Reserva SET ? WHERE id_reserva = ?",
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

export const deleteReserva = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Reserva WHERE id_reserva = ?",
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
