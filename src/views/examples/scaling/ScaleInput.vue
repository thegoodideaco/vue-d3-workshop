<template>
  <li>{{ scaleItem.name }} - test</li>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    scaleItem: {
      type: Object
    }
  },
  computed: {
    /**
     * @returns {() => number}
     */
    scale() {
      return this.scaleItem
        .scale()
        .domain(this.scaleItem.domain)
        .range(this.scaleItem.range)
    }
  }
})
</script>
