<template>
<div> 
    <button v-on:click="createComment()">Send message</button>
</div>
</template>

<script lang="ts" >
import { useMutation } from "@vue/apollo-composable";
import { defineComponent } from "vue";
import gql from 'graphql-tag'

export default defineComponent({
    setup(){
        const { mutate: createComment } = useMutation(gql`
        mutation ($name: String!, $text: String!) {
            createComment(name: $name, text: $text)
        }
        `, () => ({
            variables: {
                name: 'Zenen Alexis Peraza Gil', 
                text: 'hola desde VUE con variables'
            }
        }))





        return {
            createComment
        }
    }
})
   
</script>

<style scoped>

</style>