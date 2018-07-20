<template>
  <path class="arc-path"
        fill="#fff"
        :d="d" />
</template>

<script>
import * as d3 from 'd3-shape'
export default {
  props: {
    innerRadius: {
      type: Number,
      default: 200
    },
    outerRadius: {
      type: Number,
      default: 300
    },
    cornerRadius: {
      type: Number,
      default: 0
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

<style scoped lang="scss">
.arc-path {
  &:hover {
    stroke: #fff;
    stroke-width: 5;
  }
}
</style>