import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import http from 'http'
import { hasOwnProperty } from '@graphql-tools/utils'

export async function startApolloServer(typeDefs, resolvers){
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,        
        resolvers
    })

    await server.start()

    app.use('/graphql', cors(), express.json(), expressMiddleware(server))

    expressMiddleware(server);
    const Port_url = process.env.PORT;
    const Server_url = process.env.SERVER;
    // await new Promise(resolve => httpServer.listen({port: Port_url}, resolve))
    await new Promise(resolve => httpServer.listen({port: Port_url, host: Server_url}, resolve))
    console.log(`🌐 Server ready at https://${Server_url}:${Port_url}/graphql`)
}
 