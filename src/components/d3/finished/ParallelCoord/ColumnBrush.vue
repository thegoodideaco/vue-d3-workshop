<template>
  <rect class="column__brush"
        v-bind="sizing">

  </rect>
</template>

<script>
import * as d3 from 'd3-brush'
export default {
  data() {
    return {
      // innerScale: null
    }
  },
  props: {
    scale: {
      type: Function
    },

    // Min/Max values
    extent: {
      type: Array
    }
  },
  computed: {
    innerScale() {
      if (this.scale) {
        return this.scale.copy()
      }
    },
    sizing() {
      if (this.innerScale && this.extent) {
        const y = this.innerScale.invert(this.extent[1])
        const height = this.innerScale.invert(this.extent[0]) - y

        return {
          width: 20,
          y,
          height
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.column__brush {
  fill: #fff;
}
</style>

