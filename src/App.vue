<template>
    <h1>Notifications</h1>
<div>
    <ul>
        <li v-for="(comment, index) of comments" :key="index"><b> {{ comment.name }}:</b> {{ comment.text }} </li>
    </ul>
</div>
</template>

<script lang="ts" setup>
import { defineComponent, watch, ref } from "vue";
import { useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";


        const comments = ref<any>([])
        const { result } = useSubscription(gql`
        subscription {
            commentCreated {
                text
                name
            }
        }
        `)
        watch(
            result,
            data => {
                      comments.value.push(data.commentCreated);
            }      
        
        )

</script>

<style scoped>

</style>