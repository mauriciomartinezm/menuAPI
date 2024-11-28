import { db } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      const hashedPassword = bcrypt.hashSync(contrasena, 10);
      await db.query(query, [id_socio, nombre, apellido, correo, hashedPassword, telefono]);

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
 // Clave secreta para firmar el token (deberías mantenerla en un archivo de configuración o variable de entorno)
 const SECRET_KEY = 'esta-es-mas-contrasena-mas-larga-posible-que-se-me-ocurrio-39923933-394934jffef.w244';

export const loginSocio = async (req, res) => {


  const { correo, contrasena } = req.body;
  try {
    // Buscar al usuario por correo (suponiendo que el correo es único)
    const [result] = await db.query(
      'SELECT * FROM Socio WHERE correo = ?',
      [correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result[0];

    // Verificar que la contraseña ingresada coincide con la almacenada en la base de datos
    const isPasswordValid = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, nombre: usuario.nombre, correo: usuario.correo },
      SECRET_KEY
    );

    // Enviar el token en la respuesta
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware para verificar el token
export const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = decoded; // Guardar los datos del usuario decodificados en la solicitud
    next(); // Continuar con la ejecución del controlador de la ruta
  });
};

let blacklist = [];  // Lista negra de tokens revocados (esto podría ser una base de datos)

export const logoutUsuario = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token) {
    // Agregar el token a la lista negra
    blacklist.push(token);
    res.json({ message: 'Has cerrado sesión correctamente' });
  } else {
    res.status(400).json({ message: 'No hay token en la solicitud' });
  }
};
