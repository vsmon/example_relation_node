import User from "../models/User";

class UserController {
  async index(req, res) {
    const user = await User.findAll();

    if (!user) {
      return res.status(400).json({ error: "Nenhum usuario encontrado!" });
    }
    const { id, name, email } = user;

    return res.json(user);
  }

  async store(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "Usuario já existe" });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();
