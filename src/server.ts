import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import {authRoutes} from './routes/auth'    
import {activityRoutes} from './routes/activity'    
import jwt from '@fastify/jwt'


const app = Fastify()

app.register(multipart)
app.register(authRoutes)
app.register(activityRoutes)

app.register(jwt, {
    secret: 'secret_key'
})

app.listen({port:3333 , host:'0.0.0.0'} , (adress , error) =>{
    console.log("server is running: " )
})