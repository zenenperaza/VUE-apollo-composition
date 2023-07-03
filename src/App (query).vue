<template>
<h1>Comments</h1>
<div v-if="loading">
 <h3>Loadong ....</h3>
</div>
<div v-else>
<ul>
  <li v-for="(comment, index) in result.getCommentsFromUser" :key="index"><b> {{ comment.name }}</b>: {{ comment.text }}</li>
</ul>
</div>
<div v-if="error">
<h3>{{error.message}}</h3>
</div>
<button v-on:click="refetch()">Refresh</button>
</template>

<script lang="ts" setup>
import { useQuery, useLazyQuery } from "@vue/apollo-composable";
import gpl from 'graphql-tag'

    const {result, loading, error, refetch, onResult, onError} = useQuery(gpl`
    query GetCommentsFromUser($name: String!) {
    getCommentsFromUser(name: $name) {
      text
      name
    }
  }
    `, () => ({
      name: "User 1"
    }), {
      fetchPolicy: 'cache-and-network',
      pollInterval: 5000
    })

    onResult((queryResult) => {
      console.log(queryResult.data);
      console.log(queryResult.loading);
      console.log(queryResult.networkStatus);
      
    })

    onError((error) => {
      console.log(error.graphQLErrors);
      
    })



</script>

<style>

</style>
