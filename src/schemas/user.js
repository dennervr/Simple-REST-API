import { object, string, number, coerce } from "zod"

const User = object({ 
  id: coerce.number().int().positive("O ID deve ser um número inteiro positivo"),
  name: string("Por favor, insira o nome do usuário").min(1, "O nome do usuário não pode estar vazio"),
  email: string("Por favor, insira um email").email("Por favor, insira um email válido"),
  city: string("Por favor, insira o nome da cidade").min(1, "O nome da cidade não pode estar vazio")
})


export const UserSchema = {
  read: User.pick({id: true}),
  create: User.omit({id: true}),
  update: User.partial().required({id: true}),
  delete: User.pick({id: true})
}