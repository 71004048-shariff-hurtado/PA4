const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protegerRuta = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del header
      token = req.headers.authorization.split(' ')[1];
      
      // Verificar el token
      const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret_secreto_key_edutech');
      
      // Obtener el usuario del token (excluyendo la contraseña)
      req.user = await User.findById(decodificado.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ error: 'Usuario no encontrado, autorización denegada' });
      }
      
      next();
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.status(401).json({ error: 'Token no válido, autorización fallida' });
    }
  } else {
    res.status(401).json({ error: 'No se proporcionó un token, acceso denegado' });
  }
};

// Middleware opcional para validar roles
const permitirRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
    }
    next();
  };
};

module.exports = { protegerRuta, permitirRoles };
