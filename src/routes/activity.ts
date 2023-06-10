import {FastifyInstance} from 'fastify'
import { prisma } from '../libs/prisma'
import z from 'zod'

export async function activityRoutes(app:FastifyInstance){
  app.addHook('preHandler' , async (request)=> await request.jwtVerify())
  
    app.get('/activities' , async (request , reply)=> {
    
    const {sub} = request.user
    console.log('aqui')

    const activities = await prisma.activity.findMany({
      where:{
        userId: sub
      },
      orderBy:{
        create_at: 'asc'
      }
    })
      return activities.map(activity=> {
        return {
          id:activity.id,
          asset_number: activity.asset_number,
          is_finished:activity.is_finished ,
          create_at:activity.create_at ,
          update_at: activity.update_at,
        }
      })
    })

    app.post("/activity" , async (request, reply)=> {
      const bodySchema = z.object({
        asset_number: z.number(),
        description: z.string(),
        is_finished: z.coerce.boolean().default(false),
      })

      const {asset_number , description , is_finished} = bodySchema.parse(request.body)
      const userId = request.user.sub

        try{
          await prisma.activity.create({
            data:{
              asset_number,
              description,
              is_finished,
              userId
            }
          })
    
          return reply.status(201).send()
          
        }catch(err){
          return reply.status(302).send({
            error: err,
            message: 'Erro ao criar uma activity'
          })
        }
    })

 


}