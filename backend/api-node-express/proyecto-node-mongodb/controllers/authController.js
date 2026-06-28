const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar Token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'jwt_secret_secreto_key_edutech', {
    expiresIn: '30d'
  });
};

// @desc    Registrar nuevo usuario (Estudiante)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    
    // Crear el usuario
    const nuevoUsuario = await User.create({
      nombre,
      email,
      password,
      rol: rol || 'Estudiante'
    });
    
    res.status(201).json({
      _id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: nuevoUsuario.rol,
      token: generarToken(nuevoUsuario._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Buscar usuario por correo
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas (correo no registrado)' });
    }
    
    // Verificar contraseña
    const passwordCorrecto = await usuario.compararPassword(password);
    if (!passwordCorrecto) {
      return res.status(401).json({ error: 'Credenciales inválidas (contraseña incorrecta)' });
    }
    
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarToken(usuario._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Obtener perfil del usuario actual (autenticado)
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // req.user viene cargado por el middleware de protección
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
