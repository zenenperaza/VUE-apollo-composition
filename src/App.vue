<template>
<div><h1>Comments</h1>
    <div v-if="$apollo.queries.comments.loading"> 
        <h3>Loading...</h3>
    </div>
    <ul v-else>
        <li v-for="(comment, index) in comments" :key="index"><b>{{ comment.name }}:</b> {{ comment.text }} </li>
    </ul>

</div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue';
import gql from 'graphql-tag';

export default defineComponent({
    apollo: {
        comments: {
            query: gql`
            query($name: String!)  {
                comments: getCommentsFromUser(name: $name) {
                    text
                    name
                }
            }
            `,
            variables (){
                return {
                    name: 'User 2'
                }
            },
            fetchPolicy: 'cache-and-network',
            pollInterval: 5000
        }
    },
    data(){
        return {
            comments: []
        }
    },
    methods: {

    }

})
   
</script>

<style scoped>

</style>