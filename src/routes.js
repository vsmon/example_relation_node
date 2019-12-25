import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import auth from "./app/middlewares/auth";

const routes = new Router();

routes.get("/", (req, res) => res.end("ok"));
routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

routes.use(auth);

routes.get("/user", UserController.index);

export default routes;
