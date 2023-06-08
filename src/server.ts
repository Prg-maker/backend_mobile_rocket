import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import {authRoutes} from './routes/auth'
const fastify = Fastify()
fastify.register(multipart)

fastify.register(authRoutes)

fastify.listen({port:3333 , host:'0.0.0.0'} , (adress , error) =>{
    console.log("server is running: ")
})