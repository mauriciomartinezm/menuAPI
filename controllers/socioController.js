import { v4 as uuidv4 } from "uuid";
import { db } from "../database/db.js";

export const getSocios = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Socio");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getSocio = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM Socio WHERE id_socio = ?", [
      req.params.id,
    ]);

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

export const createSocio = async (req, res) => {
  try {
    const {
      id_socio = uuidv4(),
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
    } = req.body;
    const query =
      "INSERT INTO Socio (id_socio, nombre, apellido, correo, telefono, contrasena) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(query, [
      id_socio,
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
    ]);

    res.json({
      id_socio,
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

export const updateSocio = async (req, res) => {
  try {
    const [result] = await db.query("UPDATE Socio SET ? WHERE id_socio = ?", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encuentra registrado" });
    }

    res.json({ message: "Datos actualizados exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSocio = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Socio WHERE id_socio = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encuentra registrado" });
    }

    res.json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginSocio = async (req, res) => {

  const { email, contrasena } = req.body;

  try {
    const [result] = await db.query(
      "SELECT * FROM Socio WHERE correo = ? AND contrasena = ?",
      [email, contrasena]
    );

    if (result.length === 1) {
      return res
        .status(200)
        .json({ messageSuccess: "Inicio de sesión exitoso", user: result});
    } else {
      return res.status(401).json({ messageFail: "Credenciales inválidas" });
    }
  } catch (error) {
    return res.status(401).json({ unknown: error });
  }
};
