const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || typeof name !== "string" || name.length < 2) {
      return res.status(400).json({
        error: "Nome é obrigatório e deve ter pelo menos 2 caracteres"
      });
    }

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        error: "E-mail é obrigatório"
      });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        error: "Senha é obrigatória e deve ter pelo menos 6 caracteres"
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(409).json({
        error: "E-mail já cadastrado"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao cadastrar usuário"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        error: "E-mail é obrigatório"
      });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({
        error: "Senha é obrigatória"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        error: "Credenciais inválidas"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Credenciais inválidas"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      token
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao fazer login"
    });
  }
};

module.exports = {
  register,
  login
};