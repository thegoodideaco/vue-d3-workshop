<template>
  <g class="dimension-column">

    <!-- Red Line -->
    <line ref="line"
          v-bind="lineAttr" />

    <!-- Filter Selector -->
    <rect v-bind="rectAttr"
          @mousedown="startDrag" />

    <!-- TODO: replace with values and tick -->
    <circle v-for="(step, index) in steps"
            :key="index"
            :cx="x"
            :cy="scale(step)"
            r="5" />

    <!-- Represents the extent of this column -->
    <column-brush v-if="brushPos"
                  :scale="scale"
                  :x="x - 10"
                  :width="20"
                  :extent="brushExtent" />

  </g>
</template>

<script>
import * as d3 from 'd3'

import ColumnBrush from './ColumnBrush.vue'
export default {
  data() {
    return {
      brushPos: null
    }
  },
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
    },

    rectAttr() {
      return {
        x: this.x - 20,
        y: this.scale.range()[1],
        width: 40,
        height: this.scale.range()[0],
        fill: 'green'
      }
    },

    brushExtent: {
      get() {
        if (this.brushPos)
          return [this.scale(this.brushPos[1]), this.scale(this.brushPos[0])]
      }
    }
  },
  methods: {
    startDrag(mouseEvent) {
      const { top, left, height } = this.$refs.line.getBoundingClientRect()
      const { pageX, pageY } = mouseEvent

      this.brushPos = [height - (pageY - top), height - (pageY - top)]
      console.log(this.brushPos)
      window.addEventListener('mousemove', this.updateDrag)
      window.addEventListener('mouseup', this.endDrag)
    },
    updateDrag(mouseEvent) {
      const { top, left, height } = this.$refs.line.getBoundingClientRect()
      const { pageX, pageY } = mouseEvent
      this.brushPos = [pageY - top, this.brushPos[1]]
    },
    endDrag() {
      window.removeEventListener('mousemove', this.updateDrag)
      window.removeEventListener('mouseup', this.endDrag)
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  fill: rgba(#fff, 0.5);
}
</style>
