const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Pega o cabeçalho de autorização
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  // O formato costuma ser "Bearer TOKEN", então separamos a string
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Erro no formato do token" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.userId = decoded.id;
    
    return next();
  });
};

module.exports = authMiddleware;