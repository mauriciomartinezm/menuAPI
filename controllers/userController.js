import { pool } from "../server.js";

export const getUsers = async (req, res) => {
  console.log("Petición recibida en /getUsers");

  try {
    const [result] = await pool.query("SELECT * FROM Usuario");
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getUser = async (req, res) => {
  const emailUsuario = req.params.emailUser;
  console.log("Petición recibida en /getUser");
  console.log("Parámetros de la petición:", req.params);
  try {
    const [result] = await pool.query(
      "SELECT * FROM Usuario WHERE correo = ?",
      [emailUsuario]
    );
    if (result.length === 1) {
      return res.status(200).json({
        messageSuccess: "Usuario encontrado",
        propietario: result[0],
      });
    } else {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
  } catch (error) {
    return res.status(401).json({ unknown: "Error interno del servidor", error: error.message});
  }
};
//

export const registerUser = async (req, res) => {
  console.log("Petición recibida en /registerUser");
  console.log("Información recibida:", req.body);
  const { nombre, apellido, correo, contrasena } = req.body;
  try {
    // Verificar si el usuario ya exist
    const [existingUser] = await pool.query(
      "SELECT correo FROM Usuario WHERE correo = ?",
      [correo]
    );

    if (existingUser.length > 0) {
      console.log("El usuario ya está registrado");
      return res
        .status(409)
        .json({ existingUser: "El usuario ya está registrado" });
    }

    const result = await pool.query(
      "INSERT INTO Usuario(id_usuario, nombre, apellido, correo, contrasena) VALUES (UUID(), ?, ?, ?, ?)",
      [nombre, apellido, correo, contrasena]
    );
    console.log("Registro exitoso");
    return res.status(200).json({ messageSuccess: "Registro exitoso" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return res.status(500).json({ messageFail: error.message });
  }
};

export const loginUser = async (req, res) => {
  console.log("Petición recibida en /login");
  console.log("Cuerpo de la petición:", req.body);

  const { email, contrasena } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Usuario WHERE correo = ? AND contrasena = ?",
      [email, contrasena]
    );
    console.log("Resultado de la consulta:", result[0]);

    if (result[0].length === 1) {
      console.log("Inicio de sesión exitoso");
      return res
        .status(200)
        .json({ messageSuccess: "Inicio de sesión exitoso", user: result[0] });
    } else {
      console.log("Credenciales inválidas");
      return res.status(401).json({ messageFail: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(401).json({ unknown: "Credenciales inválidas" });
  }
};

export const updateUser = async (req, res) => {
  console.log("Petición recibida en /updateUser");
  console.log("Cuerpo recibido: ", req.body);
  console.log("Parámetros recibidos: ", req.params);

  try {
    const result = await pool.query(
      "UPDATE Usuario SET ? WHERE correo = ?",
      [req.body, req.params.emailUser]
    );
    res
      .status(200)
      .json({ messageSuccess: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  console.log("Petición recibida en /deleteUser");
  console.log("Parámetros recibidos: ", req.params);
  const emailUser = req.params.emailUser;
  try {
    const result = await pool.query(
      "DELETE FROM Usuario WHERE correo = ?",
      [emailUser]
    );

    if (result[0].affectedRows > 0) {
      res
        .status(200)
        .json({ messageSuccessss: "Usuario eliminado correctamente", AffectedRows: result[0].affectedRows });
    } else {
      res
        .status(404)
        .json({ messageError: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

