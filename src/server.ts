import Fastify from 'fastify'
import multipart from '@fastify/multipart'

const fastify = Fastify()
fastify.register(multipart)



fastify.listen({port:3333 , host:'0.0.0.0'} , (adress , error) =>{
    console.log("server is running: ")
})