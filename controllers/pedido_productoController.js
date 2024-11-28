import { v4 as uuidv4 } from 'uuid';
import { db } from "../database/db.js";

export const getPedido_Producto = async (req, res) => {
  console.log("Petición recibida en /getPedido_Producto");

  try {
    const [result] = await db.query("SELECT * FROM Pedido_Producto");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getPedido_ProductoId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Pedido_Producto WHERE id_pedido = ?",
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

export const createPedido_Productos = async (req, res) => {
    try {
      const { id_pedido, productos } = req.body;
  
      if (!id_pedido || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "Datos inválidos." });
      }
  
      const query = `
        INSERT INTO Pedido_Producto (id_pedido, id_producto, cantidad, observaciones)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        cantidad = VALUES(cantidad),
        observaciones = VALUES(observaciones);
      `;
  
      // Iterar sobre los productos y ejecutarlos en la base de datos
      for (const producto of productos) {
        const { id_producto, cantidad, observaciones } = producto;
  
        await db.query(query, [
          id_pedido,
          id_producto,
          cantidad,
          observaciones,
        ]);
      }
  
      res.json({ message: "Productos procesados exitosamente." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const updatePedido_Producto = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Pedido_Producto SET ? WHERE id_pedido = ?",
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

export const deletePedido_Producto = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Pedido_Producto WHERE id_pedido = ?",
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
