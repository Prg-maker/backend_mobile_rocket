import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import { authRoutes } from './routes/auth'
import { activityRoutes } from './routes/activity'
import jwt from '@fastify/jwt'

const app = Fastify()

// Registrando o plugin "multipart" para lidar com requisições multipart/form-data
app.register(multipart)

// Registrando as rotas relacionadas à autenticação
app.register(authRoutes)

// Registrando as rotas relacionadas à atividade
app.register(activityRoutes)

// Registrando o plugin "jwt" para lidar com autenticação baseada em JWT
app.register(jwt, {
  secret: 'secret_key'
})

// Iniciando o servidor
app.listen({ port: 3333, host: '0.0.0.0' }, (address, error) => {
  console.log("server is running: ")
})
