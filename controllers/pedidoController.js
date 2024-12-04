import { v4 as uuidv4 } from "uuid";
import { db } from "../database/db.js";

export const getPedido = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Pedido");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getPedidoUsuario = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Pedido WHERE id_cliente = ?",
      [req.params.id]
    );
    //console.log(result);
    res.json(result);

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getPedidoProductoID = async (req, res) => {
    try {
      const [result] = await db.query("SELECT * FROM Pedido_Producto WHERE id_pedido = ?", [req.params.id]);
      res.json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error interno del servidor", error: error.message });
    }
  };

export const getPedidoProducto = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Pedido_Producto");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const createPedido = async (req, res) => {
  //console.log("Resultado de insert into pedido: ", req.body);

  try {
    // Recibir datos del pedido desde el cuerpo de la solicitud
    const {
      id_cliente,
      id_restaurante,
      monto_total,
      estado,
      metodo_pago,
      productos, // Lista de productos con cantidad
    } = req.body;

    // Validar datos obligatorios
    if (
      !id_cliente ||
      !id_restaurante ||
      !monto_total ||
      !estado ||
      !metodo_pago ||
      !productos ||
      !Array.isArray(productos) ||
      productos.length === 0
    ) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    // Generar un ID único para el pedido
    const id_pedido = uuidv4();

    // Crear registro en la tabla Pedido
    const fecha_hora = new Date(); // Fecha y hora actuales
    const [result] = await db.query(
      "INSERT INTO Pedido (id_pedido, id_cliente, id_restaurante, fecha_hora, monto_total, estado, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        id_pedido,
        id_cliente,
        id_restaurante,
        fecha_hora,
        monto_total,
        estado,
        metodo_pago,
      ]
    );

    //console.log("Resultado de insert into pedido: ", result);

    // Registrar los productos en la tabla Pedido_Producto
    for (const producto of productos) {
      const { id_producto, cantidad, observaciones } = producto;

      if (!id_producto || !cantidad) {
        return res
          .status(400)
          .json({ message: "Datos de producto incompletos o inválidos" });
      }

      await db.query(
        "INSERT INTO Pedido_Producto (id_pedido, id_producto, cantidad, observaciones) VALUES (?, ?, ?, ?)",
        [id_pedido, id_producto, cantidad, observaciones || null]
      );
    }

    res.status(201).json({
      message: "Pedido registrado con éxito",
      id_pedido,
    });
  } catch (error) {
    console.error("Error al registrar el pedido:", error);
    res.status(500).json({
      message: "Error al registrar el pedido",
      error: error.message,
    });
  }
};
