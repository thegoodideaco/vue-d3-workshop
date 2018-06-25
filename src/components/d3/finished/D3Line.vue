<template>
    <g>
        <path :d="d"></path>
    </g>
</template>

<script>
import _ from 'lodash'
import { line, curveCardinal } from 'd3'

export default {
  data() {
    return {
      dataset: [[12, 50], [40, 70], [50, 10], [80, 30], [143, 90], [180, 20]]
    }
  },
  computed: {
    d() {
      return line({})
        .curve(curveCardinal)
        .x(v => v[0])
        .y(v => v[1])(this.dataset)
    }
  }
}
</script>

<style scoped lang="scss">
path {
  fill: none;
  stroke: #fff;
  stroke-width: 5px;

  transition: all 1500ms ease;
}
</style>