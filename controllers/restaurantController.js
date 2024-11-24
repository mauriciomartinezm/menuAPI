
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

export const getRestaurant = async (req, res) => {
  const emailRestaurant = req.params.emailRestaurant;
  console.log("Petición recibida en /getRestaurant");
  console.log("Parámetros de la petición:", req.params);
  try {
    const [result] = await db.query(
      "SELECT * FROM Restaurante WHERE correo = ?",
      [emailRestaurant]
    );
    if (result.length === 1) {
      return res.status(200).json({
        messageSuccess: "Restaurante encontrado",
        result: result[0],
      });
    } else {
      return res.status(404).json({
        error: "Restaurante no encontrado",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ unknown: "Error interno del servidor", error: error.message });
  }
};
//

export const registerRestaurant = async (req, res) => {
  console.log("Petición recibida en /registerRestaurant");
  console.log("Información recibida:", req.body);
  const { nombre_restaurante, correo, telefono, direccion, nombre_categoria, id_horario, id_dueno } = req.body;
  try {
    // Verificar si el usuario ya exist
    const [existingRestaurant] = await db.query(
      "SELECT correo FROM Restaurante WHERE correo = ?",
      [correo]
    );

    if (existingRestaurant.length > 0) {
      console.log("El restaurante ya está registrado");
      return res
        .status(409)
        .json({ existingRestaurant: "El restaurante ya está registrado" });
    }

    const result = await db.query(
      "INSERT INTO Restaurante(id_restaurante, nombre_restaurante, correo, telefono, direccion, id_categoria, id_horario, id_dueno) VALUES (UUID(), ?, ?, ?, ?, SELECT id_categoria FROM Categoria WHERE nombre = ?), ?, ?)",
      [nombre_restaurante, correo, telefono, direccion, nombre_categoria, id_horario, id_dueno]
    );
    console.log("Registro exitoso");
    return res.status(200).json({ messageSuccess: "Registro exitoso" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ messageFail: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  console.log("Petición recibida en /updateRestaurant");
  console.log("Cuerpo recibido: ", req.body);
  console.log("Parámetros recibidos: ", req.params);

  try {
    const result = await pool.query("UPDATE Restaurante SET ? WHERE correo = ?", [
      req.body,
      req.params.emailRestaurant,
    ]);
    res
      .status(200)
      .json({ messageSuccess: "Restaurante actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar restaurante:", error);
    res.status(500).json({ message: error.message });
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

export const deleteRestaurante = async (req, res) => {
  console.log("Petición recibida en /deleteRestaurant");
  console.log("Parámetros recibidos: ", req.params);
  try {
    const [result] = await db.query(
      "DELETE FROM Restaurante WHERE id_restaurante = ?",
      [req.params.id]
    );

    if (result[0].affectedRows > 0) {
      res
        .status(200)
        .json({
          messageSuccessss: "Restaurante eliminado correctamente",
          AffectedRows: result[0].affectedRows,
        });
    } else {
      res.status(404).json({ messageError: "Restaurante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
