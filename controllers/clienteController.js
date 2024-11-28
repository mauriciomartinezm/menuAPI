import { db } from "../database/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
      const hashedPassword = bcrypt.hashSync(contrasena, 10);
      await db.query(query, [
      id_cliente,
      nombre,
      apellido,
      correo,
      telefono,
      hashedPassword,
    ]);

    res.status(200).json({
      id_cliente,
      nombre,
      apellido,
      correo,
      telefono,
      hashedPassword,
      mensaje: "Datos guardados exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clave secreta para firmar el token (deberías mantenerla en un archivo de configuración o variable de entorno)
const SECRET_KEY = 'esta-es-mas-contrasena-mas-larga-posible-que-se-me-ocurrio-39923933-394934jffef.w244';

export const loginCliente = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    // Buscar al Cliente por correo (suponiendo que el correo es único)
    const [result] = await db.query(
      'SELECT * FROM Cliente WHERE correo = ?',
      [correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'cliente no encontrado' });
    }

    const cliente = result[0];

    // Verificar que la contraseña ingresada coincide con la almacenada en la base de datos
    const isPasswordValid = bcrypt.compareSync(contrasena, cliente.contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id_cliente: cliente.id_cliente, nombre: cliente.nombre, correo: cliente.correo },
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
    req.user = decoded; // Guardar los datos del cliente decodificados en la solicitud
    next(); // Continuar con la ejecución del controlador de la ruta
  });
};

let blacklist = [];  // Lista negra de tokens revocados (esto podría ser una base de datos)

export const logoutCliente = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token) {
    // Agregar el token a la lista negra
    blacklist.push(token);
    res.json({ message: 'Has cerrado sesión correctamente' });
  } else {
    res.status(400).json({ message: 'No hay token en la solicitud' });
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

    res.json({ message: "Datos actualizados exitosamente" });
  } catch (error) {
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
