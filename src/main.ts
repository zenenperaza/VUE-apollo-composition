import { createApp, provide, h } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

createApp({
    setup(){
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App), 
}).mount('#app')
