import { db } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid';

export const getCategoria = async (req, res) => {
  console.log("Petición recibida en /getCategoria");

  try {
    const [result] = await db.query("SELECT * FROM Categoria");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getCategoriaId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Categoria WHERE id_categoria = ?",
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

export const createCategoria = async (req, res) => {
  try {
      const { id_categoria = uuidv4(), nombre } = req.body;
      const query = 'INSERT INTO Categoria (id_categoria, nombre) VALUES (?, ?)';
      await db.query(query, [id_categoria, nombre]);

      res.json({
        id_categoria,
        nombre,
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Categoria SET ? WHERE id_categoria = ?",
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

export const deleteCategoria = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Categoria WHERE id_categoria = ?",
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
