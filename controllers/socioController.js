import { db } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid';
//import bcrypt from 'bcryptjs';

export const getSocio = async (req, res) => {
  console.log("Petición recibida en /getSocio");

  try {
    const [result] = await db.query("SELECT * FROM Socio");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getSocioId = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM Socio WHERE id_socio = ?",
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

export const createSocio = async (req, res) => {
  try {
      const { id_socio = uuidv4(), nombre, apellido, correo, contrasena, telefono} = req.body;
      
      const checkEmailQuery = 'SELECT * FROM Socio WHERE correo = ?';
      const [existingUser] = await db.query(checkEmailQuery, [correo]);
  
      if (existingUser.length > 0) {
        return res.status(400).json({
          message: "El correo ya está en uso. Por favor, use uno diferente.",
        });
      }
  
      const query = 'INSERT INTO Socio (id_socio, nombre, apellido, correo, contrasena, telefono) VALUES (?, ?, ?, ?, ?, ?)';
  //    const hashedPassword = bcrypt.hashSync(contrasena, 10);
      await db.query(query, [id_socio, nombre, apellido, correo, contrasena, telefono]);

      res.json({
        id_socio,
        nombre, 
        apellido, 
        correo , 
      hashedPassword, 
      telefono, 
        mensaje: "Datos guardados exitosamente",
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const updateSocio = async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE Socio SET ? WHERE id_socio = ?",
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

export const deleteSocio = async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM Socio WHERE id_socio = ?",
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
