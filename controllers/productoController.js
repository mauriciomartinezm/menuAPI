import { v4 as uuidv4 } from 'uuid';
import { db } from "../database/db.js";

export const getProducto = async (req, res) => {
  console.log("Petición recibida en /getProducto");

  try {
    const [result] = await db.query("SELECT * FROM Producto");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getProductoId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Producto WHERE id_producto = ?",
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

export const createProducto = async (req, res) => {
  try {
      const { id_producto = uuidv4(),  id_restaurante, nombre, descripcion, precio, imagen} = req.body;
      const query = 'INSERT INTO Producto (id_producto,  id_restaurante, nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)';
      await db.query(query, [id_producto,  id_restaurante, nombre, descripcion, precio, imagen]);

      res.json({
        id_producto,
        id_restaurante,
        nombre,
        descripcion,
        precio,
        imagen,
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Producto SET ? WHERE id_producto = ?",
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

export const deleteProducto = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Producto WHERE id_producto = ?",
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
