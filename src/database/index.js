import Sequelize from "sequelize";
import DbConfig from "../config/database";
import User from "../app/models/User";
import File from "../app/models/File";

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(DbConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
