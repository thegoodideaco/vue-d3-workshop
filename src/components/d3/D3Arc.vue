<template>
  <path fill="yellow"
  :d="d"/>
</template>

<script>
import * as d3 from 'd3-shape'
export default {
  props: {
    innerRadius: {
      type: Number,
      default: 0
    },
    outerRadius: {
      type: Number,
      default: 100
    },
    cornerRadius: {
      type: Number,
      default: 10
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: 2
    }
  },
  computed: {
    arcGenerator() {
      return d3
        .arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
        .cornerRadius(this.cornerRadius)
        .startAngle(this.startAngle)
        .endAngle(this.endAngle)
    },
    d() {
      return this.arcGenerator()
    }
  }
}
</script>