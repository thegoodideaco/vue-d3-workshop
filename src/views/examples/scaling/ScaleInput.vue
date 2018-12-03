<template>
  <li>
    {{scaleItem.name}} - test
  </li>
</template>

<script>
import { ScaleItem } from './ScaleInput'
import Vue from 'vue'

export default Vue.extend({
  props: {
    /** @type {ScaleItem} */
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