import {FastifyInstance} from 'fastify'
import {prisma} from '../libs/prisma'
import z from 'zod'
import { emailVerification } from '../libs/email-verification'

export async function authRoutes(app:FastifyInstance){
  app.post('/register' , async (request, reply)=> {
    const bodySchema = z.object({
      email:z.string(),
      password:z.string()
    })

    const {email, password} = bodySchema.parse(request.body)

    const email_Validate =  emailVerification(user?.email)

    if(email_Validate) return reply.status(400).send("Email invalid")

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

    const token = app.jwt.sign({
      email: user?.email,
    }, {
      sub: user?.id,
      expiresIn: '2d'
    })

    

    return {token}


  })
}