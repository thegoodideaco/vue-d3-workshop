<template>
  <div class="fill content">
    Hello
  </div>
</template>

<script>
import * as d3 from 'd3'
import bounds from '@/utils/mixins/bounds'
export default {
  name: 'ParallelCoordsDemo',
  data() {
    return {
      dataset: []
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/cars.csv').then(d => {

      this.dataset = d
    })
  },
  mixins: [
    bounds
  ]
}
</script>

<style lang="scss" scoped>
svg.coord {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  /deep/ path {
    // stroke: rgba(#fff, 0.15);
    stroke-width: 1px;
    stroke-linecap: round;
  }
}

.content {
  height: 100%;
  display: grid;
  grid: 50% 50% / 100%;
  row-gap: 15px;
  position: relative;
  height: 100%;
}
</style>
