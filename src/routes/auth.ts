import { FastifyInstance } from 'fastify'
import { prisma } from '../libs/prisma'
import z from 'zod'
import { emailVerification } from '../libs/email-verification'

export async function authRoutes(app: FastifyInstance) {
  // Rota para registrar um novo usuário
  app.post('/register', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string(),
      password: z.string()
    })

    // Valida o corpo da solicitação com o esquema definido usando o Zod
    const { email, password } = bodySchema.parse(request.body)

    // Verifica se o e-mail é válido usando a função emailVerification
    const email_Validate = emailVerification(email)

    if (email_Validate == false) {
      // Retorna uma resposta com status 400 (Bad Request) e uma mensagem de erro se o e-mail for inválido
      return reply.status(400).send("Email invalid")
    }

    // Verifica se o usuário já existe no banco de dados
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      // Se o usuário não existir, cria um novo usuário no banco de dados com o e-mail e senha fornecidos
      await prisma.user.create({
        data: {
          email,
          password
        }
      })
    } else if (password != user.password) {
      // Se o usuário existir, verifica se a senha fornecida corresponde à senha armazenada no banco de dados
      // Retorna uma resposta com status 400 (Bad Request) e uma mensagem de erro se a senha estiver incorreta
      return reply.status(400).send("password incorrect")
    }

    // Gera um token JWT para o usuário
    const token = app.jwt.sign({
      email: user?.email,
    }, {
      sub: user?.id,
      expiresIn: '2d'
    })

    // Retorna o token JWT para o cliente
    return { token }
  })
}
