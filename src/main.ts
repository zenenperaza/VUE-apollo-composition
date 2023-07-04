import { createApp, provide, h } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { HttpLink, split } from "@apollo/client/core"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"; // <-- This one uses graphql-ws
import { getMainDefinition } from "@apollo/client/utilities"
import { createClient } from "graphql-ws";

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
})

// Create a GraphQLWsLink link:
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

// Create the apollo client with cache implementation.
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

createApp({
    setup(){
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App), 
}).mount('#app')
