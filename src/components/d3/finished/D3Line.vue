<template>
  <g>
    <path :d="d"></path>
  </g>
</template>

<script>
// import _ from 'lodash'
import * as d3 from 'd3-shape'

export default {
  data() {
    return {}
  },
  props: {
    dataset: {
      type: Array,
      default() {
        return [[12, 50], [40, 70], [50, 10], [80, 30], [143, 90], [180, 20]]
      }
    }
  },
  computed: {
    d() {
      return (
        d3
          .line()
          // .curve(curveCardinal)
          .x(v => v[0])
          .y(v => v[1])(this.dataset)
      )
    }
  }
}
</script>

<style scoped lang="scss">
path {
  fill: none;
  stroke: #fff;
  // stroke-width: 5px;

  transition: all 1500ms ease;
}
</style>