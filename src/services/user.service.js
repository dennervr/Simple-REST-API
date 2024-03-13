import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserService {
  findMany(){
    return prisma.user.findMany()
  }

  create(data){
    return prisma.user.create({data})
  }

  findUnique(id){
    return prisma.user.findUnique({where: {id}})
  }

  delete(id){
    return prisma.user.delete({where: {id}})
  }

  update(data){
    const {id, ...rest} = data

    return prisma.user.update({where: {id}, data: {...rest}})
  }
}