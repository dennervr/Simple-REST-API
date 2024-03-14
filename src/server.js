import express from "express";
import cors from "cors"
import { UserSchema } from "./schemas/user.js";
import { UserService } from "./services/user.service.js";
import { errorHandler } from "./lib/error-handler.js";

const PORT = process.env.PORT || 3000;
const userService = new UserService();

const app = express();

app.use(express.json());
app.use(cors())
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server Listening on port:", PORT);
});

app.get("/users", async (req, res) => {
  try {
    const users = await userService.findMany();
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
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
    console.error("Erro ao obter usuário:", error);
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
    console.error("Erro ao criar usuário:", error);
    return res.status(400).json({ message: "Erro ao criar usuário", error: error.issues });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = UserSchema.update.parse(req.body);
    const user = await userService.update(id, data);

    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(400).json({ message: "Erro ao atualizar usuário", error: error.issues });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.delete(id);

    res.status(200).json({ message: "Usuário removido com sucesso", user });
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    return res.status(500).json({ message: "Erro ao remover usuário", error: error.message });
  }
});
