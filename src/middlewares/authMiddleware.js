const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação JWT.
 * Valida o token enviado no header Authorization no formato Bearer TOKEN.
 * Se válido, adiciona o id do usuário em req.usuarioId.
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  // Espera formato: "Bearer TOKEN"
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato do token inválido' });
  }

  try {
    // Debug: confira o segredo JWT carregado do .env
    console.log('[DEBUG] JWT_SECRET:', JSON.stringify(process.env.JWT_SECRET));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Token inválido' });
  }
};