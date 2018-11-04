<template>
  <g class="dimension-column">
    <line v-bind="lineAttr" />

    <circle v-for="(step, index) in steps"
            :key="index"
            :cx="x"
            :cy="scale(step)"
            r="5" />

    <column-brush />

  </g>
</template>

<script>
import * as d3 from 'd3'

import ColumnBrush from './ColumnBrush.vue'
export default {
  components: {
    ColumnBrush
  },
  props: {
    x: {
      type: Number,
      default: 0
    },
    scale: {
      type: Function,
      default: d3
        .scaleLinear()
        .range([-1000, 1000])
        .domain([0, 100])
    },
    inverted: {
      type: Boolean
    }
  },
  computed: {
    // Array of y values
    steps() {
      if (this.scale) {
        return this.scale.nice().ticks()
      }
    },

    lineAttr() {
      return {
        x1: this.x,
        y1: this.scale.range()[0],
        x2: this.x,
        y2: this.scale.range()[1],
        stroke: 'red',
        strokeWidth: '5px'
      }
    }
  },
  watch: {
    inverted: {
      handler(val) {
        if (val) {
          this.scale.range(this.scale.range().reverse())
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  fill: rgba(#fff, 0.5);
}
</style>
