<template>
<div> 
    <button v-on:click="createComment()">Send message</button>
</div>
</template>

<script lang="ts" setup>
import { useMutation } from "@vue/apollo-composable";
import gql from 'graphql-tag'


        const { mutate: createComment, loading: createCommentLoading, error: createCommentError, onDone, onError } = useMutation(gql`
        mutation ($name: String!, $text: String!) {
            createComment(name: $name, text: $text)
        }
        `, () => ({
            variables: {
                name: 'Zenen Alexis Peraza Gil', 
                text: 'hola desde VUE con variables'
            },
            update: (cache, {data: {createComment}}) => {
                let data = cache.readQuery({query: getAllComments})
                data = {
                    ...data, 
                    comments:[
                        ...data.comments,
                        name: "",
                        text: ""
                    ]
                }
                cache.writeQuery({query: getAllComments, data})
            }
        }))

        onDone((done)=>{
            console.log(done.value);
            
        })

        onError(()=>{
            console.log(error.message);
            
        })


   
</script>

<style scoped>

</style>