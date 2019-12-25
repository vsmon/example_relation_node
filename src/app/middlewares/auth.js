import jwt from "jsonwebtoken";

export default async function(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token nao enviado!" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = await jwt.verify(token, "rodrigo");
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: "Token inválido!" });
  }

  return next();
}
