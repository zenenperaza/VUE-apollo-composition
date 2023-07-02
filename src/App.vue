<template>
<h1>hell world</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from "@vue/apollo-composable";
import gpl from 'graphql-tag'

export default defineComponent({
  setup(){
    const {result, loading, error} = useQuery(gpl`
    query {
      getAllComments{
        neme
        text
      }
    }
    `)
    return {
      result, loading, error
    }
  }
})
</script>

<style>

</style>
