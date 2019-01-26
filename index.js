const config = require("./server/config");
const {schema: schemaDef} = require("./server/schema");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const root = require("./server/resolvers")
const app = express();

const schema = buildSchema(schemaDef);


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(config.express.port, () => {
  console.log(`Server is up an running on port ${config.express.port}`);
});
