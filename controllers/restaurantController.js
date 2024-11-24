
import { db } from "../database/db.js";

export const getRestaurants = async (req, res) => {
  console.log("Petición recibida en /getRestaurants");

  try {
    const [result] = await db.query("SELECT * FROM Restaurante");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getRestauranteId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Restaurante WHERE id_restaurante = ?",
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

export const createRestaurante = async (req, res) => {
  try {
      const { id_restaurante = uuidv4(), titulo, descripcion, categoria, tipo, id_usuario } = req.body;
      const query = 'INSERT INTO Restaurante (id_restaurante, titulo, descripcion, categoria, tipo, id_usuario) VALUES (?, ?, ?, ?, ?, ?)';
      await db.query(query, [id_restaurante, titulo, descripcion, categoria, tipo, id_usuario]);

      res.json({
        id_restaurante,
        titulo,
        descripcion,
        categoria,
        tipo,
        id_usuario,
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateRestaurante = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Restaurante SET ? WHERE id_restaurante = ?",
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

export const deleteRestaurante = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Restaurante WHERE id_restaurante = ?",
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
