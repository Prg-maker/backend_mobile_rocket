import {FastifyInstance} from 'fastify'
import {prisma} from '../libs/prisma'
import z from 'zod'

export async function authRoutes(app:FastifyInstance){
  app.post('/register' , async (request, reply)=> {
    const bodySchema = z.object({
      email:z.string(),
      password:z.string()
    })

    const {email, password} = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
      where:{
        email
      }
    })
    if(!user){
      await prisma.user.create({
        data:{
          email,
          password
        }
      })
    }else if(password != user.password){
      return reply.status(400).send("password incorrect")
    }

    return reply.status(201).send()

  })
}