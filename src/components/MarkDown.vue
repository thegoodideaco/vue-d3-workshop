<template>
  <div>
    <vue-markdown :source="source" />
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  props: {
    source: {
      type: String,
      required: true
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style>
</style>
