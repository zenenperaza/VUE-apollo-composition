<template>
    <h3>Notification</h3>
<ul>
    <li v-for="(comment, index) of comments" :key="index"> <b>{{ comment.name }}</b>: {{ comment.text }} </li>
</ul>
</template>

<script lang="ts" >
   import { defineComponent, watch, ref } from "vue";
   import { useSubscription } from "@vue/apollo-composable";
   import gql from 'graphql-tag'
   
   export default defineComponent({
    setup(){
        const comments = ref<any>([])
        
        const { result } = useSubscription(gql`
        subscription {
        commentCreated {
            name
            text
        }
        }
        `)
        watch(
            result,
            data => { 
                comments.value.push(data.commentCreated);
             }
        )
        return {
            comments
        }
    }
   })
</script>