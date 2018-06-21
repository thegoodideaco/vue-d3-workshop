<template>
  <vue-markdown :source="source">
    <slot>
      #hello
    </slot>
  </vue-markdown>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  props: {
    source: {
      type: String,
      default: '#hello there'
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style>
</style>
