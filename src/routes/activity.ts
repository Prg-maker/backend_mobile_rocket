import {FastifyInstance} from 'fastify'
import { prisma } from '../libs/prisma'
import z from 'zod'

export async function activityRoutes(app:FastifyInstance){

  // Adiciona um gancho (hook) para verificar e autenticar o JWT antes de cada manipulador de rota
  app.addHook('preHandler' , async (request)=> await request.jwtVerify())
  
  // Rota para buscar todas as atividades de um usuário específico
  
   app.get('/activities' , async (request , reply)=> {
    
    const {sub} = request.user
    // Busca as atividades no banco de dados usando o Prisma
    const activities = await prisma.activity.findMany({
      where:{
        userId: sub
      },
      orderBy:{
        create_at: 'asc'
      }
    })
    // Retorna um array contendo apenas as informações relevantes das atividades
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

    // Rota para buscar uma atividade específica com base no seu ID
    app.get( '/activity/:id', (request, reply) => {

    })

    // Rota para criar uma nova atividade
    app.post("/activity" , async (request, reply)=> {

      // Valida o corpo da solicitação com o esquema definido usando o Zod
      const bodySchema = z.object({
        asset_number: z.number(),
        description: z.string(),
        is_finished: z.coerce.boolean().default(false),
      })

      const {asset_number , description , is_finished} = bodySchema.parse(request.body)
      const userId = request.user.sub

        try{
          // Cria uma nova atividade no banco de dados usando o Prisma
          await prisma.activity.create({
            data:{
              asset_number,
              description,
              is_finished,
              userId
            }
          })
          //Retorna uma resposta com status 201 (Created) para indicar sucesso
          return reply.status(201).send()
          
        }catch(err){
          // Retorna uma resposta com status 302 (Found) e uma mensagem de erro em caso de falha
          return reply.status(302).send({
            error: err,
            message: 'Erro ao criar uma activity'
          })
        }
    })

    // Rota para atualizar uma atividade existente com base no seu ID
    app.put("/activity/:id", (request , reply)=> {

    })
}