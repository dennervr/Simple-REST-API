import express from "express";
import cors from "cors"
import { UserSchema } from "./schemas/user.js";
import { UserService } from "./services/user.service.js";
import { errorHandler } from "./lib/error-handler.js";

const PORT = process.env.PORT || 3000;
const userService = new UserService();

const app = express();

const a = (err, res, req, next) => {
  console.log("buto")
}

app.use(express.json());
app.use(cors())


app.listen(PORT, () => {
  console.log("Server Listening on port:", PORT);
});

app.get("/users", async (req, res) => {
  try {
    const users = await userService.findMany();
    return res.status(200).json(users);
  } catch (error) {
    return next(error)
    return res.status(500).json({ message: "Erro ao obter usuários" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = UserSchema.read.parse(req.params);
    const user = await userService.findUnique(id);

    if (user !== null)
      return res.status(200).json(user);
    return res.status(404).json({ message: "Nenhum usuário encontrado" });
  } catch (error) {
    return next(error)
    return res.status(400).json({ message: "Erro ao obter usuário", error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const data = UserSchema.create.parse(req.body);
    const user = await userService.create(data);

    res.location("/users/" + user.id)
    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    return next(error)
    return res.status(400).json({ message: "Erro ao criar usuário", error: error.issues });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const data = UserSchema.update.parse({ ...req.body, ...req.params });
    const user = await userService.update(data);

    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    return next(error)
    return res.status(400).json({ message: "Erro ao atualizar usuário", error: error.issues });
  }
});

app.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = UserSchema.delete.parse(req.params)
    const user = await userService.delete(id);

    res.status(200).json({ message: "Usuário removido com sucesso", user });
  } catch (error) {
    console.log("catch");
    return next(error)
  }
});

app.use(errorHandler);