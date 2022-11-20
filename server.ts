import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "/home/sky/Documents/graphql-server1/.env" });
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./src/typeDefs";
import resolvers from "./src/resolvers";
import mongoose from "mongoose";

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  }) as any;
  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });
  await mongoose.connect(<string>process.env.MONGO_URL);
  console.log("database connected");
  await new Promise<void>(
    (resolve) => app.listen({ port: process.env.PORT }, resolve) //run the server on port 4000
  );
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer();
