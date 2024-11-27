import { v4 as uuidv4 } from 'uuid';
import { db } from "../database/db.js";

export const getPedido = async (req, res) => {
  console.log("Petición recibida en /getPedido");

  try {
    const [result] = await db.query("SELECT * FROM Pedido");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getPedidoId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Pedido WHERE id_pedido = ?",
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

export const createPedido = async (req, res) => {
  try {
      const { id_pedido = uuidv4(),  id_restaurante, id_cliente, monto_total, estado, metodo_pago} = req.body;
      const query = 'INSERT INTO Pedido (id_pedido,  id_restaurante, id_cliente, monto_total, estado, metodo_pago) VALUES (?, ?, ?, ?, ?, ?)';
      await db.query(query, [id_pedido,  id_restaurante, id_cliente, monto_total, estado, metodo_pago]);

      res.json({
        id_pedido,
        id_restaurante,
        id_cliente,
        monto_total,
        estado,
        metodo_pago,
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Pedido SET ? WHERE id_pedido = ?",
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

export const deletePedido = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Pedido WHERE id_pedido = ?",
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
