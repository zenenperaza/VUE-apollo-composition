<template>
<div><h1>Mutations</h1>
   
<button v-on:click="addComment()">Add comments</button>
</div>
</template>

<script lang="ts" >
import { defineComponent } from 'vue';
import gql from 'graphql-tag';

export default defineComponent({
    methods: {
        addComment(){
            this.$apollo.mutate({
                mutation: gql`
                mutation($name: String!, $text: String!) {
                 createComment(name: $name, text: $text)
                }
                `
                ,
                variables() {
                    return {
                        name: 'Vue',
                        text: 'Coment from vue'
                    }
                }
                ,
            })
        }
    }

})
   
</script>

<style scoped>

</style>