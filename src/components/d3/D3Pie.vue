<template>
  <g>
    <d3-arc v-for="(item, index) in paths"
            :key="index"
            :fill="colors[index]"
            :start-angle="item.startAngle"
            :end-angle="item.endAngle" />
  </g>
</template>

<script>
import * as d3 from 'd3'
import D3Arc from './finished/D3Arc'
export default {
  components: {
    D3Arc
  },
  props: {
    inputDatum: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    index: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: Math.PI * 2
    },
    padAngle: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pieGenerator() {
      return d3
        .pie()
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
        .padAngle(this.padAngle)
    },
    paths() {
      return this.pieGenerator(this.inputDatum)
    }
  }
}
</script>
