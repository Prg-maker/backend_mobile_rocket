import Fastify from 'fastify'

const fastify = Fastify()


fastify.listen({port:3333 , host:'0.0.0.0'} , (adress , error) =>{
    console.log("server is running: ")
})