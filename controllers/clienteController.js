import { db } from "../database/db.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const getClientes = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Cliente");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getCliente = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Cliente WHERE id_cliente = ?",
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
//

export const createCliente = async (req, res) => {
  try {
    const {
      id_cliente = uuidv4(),
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
    } = req.body;
    const query =
      "INSERT INTO Cliente (id_cliente, nombre, apellido, correo, telefono, contrasena) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(query, [
      id_cliente,
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
    ]);

    res.status(200).json({
      id_cliente,
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
      mensaje: "Datos guardados exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginCliente = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [result] = await db.query(
      "SELECT * FROM Cliente WHERE correo = ? AND contrasena = ?",
      [correo, contrasena]
    );

    if (result.length === 1) {
      const user = result[0];
      const payload = {
        id: user.id_cliente,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        imagen_perfil: user.imagen_perfil,
        telefono: user.telefono,
        direccion: user.direccion,
        fecha_nacimiento: user.fecha_nacimiento,
        preferencias: user.preferencias,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).json({
        messageSuccess: "Inicio de sesión exitoso",
        token, // Se devuelve el token generado al frontend
        cliente: {
          id: user.id_cliente,
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          imagen_perfil: user.imagen_perfil,
          telefono: user.telefono,
          direccion: user.direccion,
          fecha_nacimiento: user.fecha_nacimiento,
          preferencias: user.preferencias,
        },
      });
    } else {
      return res.status(401).json({ messageFail: "Credenciales inválidas" });
    }
  } catch (error) {
    return res.status(401).json({ unknown: error });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Cliente SET ? WHERE id_cliente = ?",
      [req.body, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encuentra registrado" });
    }

    res.json({ message: "Datos actualizados exitosamente"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Cliente WHERE id_cliente = ?",
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
