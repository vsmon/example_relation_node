import User from "../models/User";

import jwt from "jsonwebtoken";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Usuario nao existe!" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password invalido!" });
    }

    const { id, name } = user;
    const token = await jwt.sign({ id }, "rodrigo", { expiresIn: "7d" });

    return res.json({
      user: {
        name,
        email
      },
      token
    });
  }
}

export default new SessionController();
