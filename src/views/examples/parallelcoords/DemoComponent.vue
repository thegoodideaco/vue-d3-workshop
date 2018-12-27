<template>
  <div class="fill content">
    Hello
    <svg v-bind="dimensions">
      <div is="ColumnBrush"
           :height="500"
           v-model="range" />
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import bounds from '@/utils/mixins/bounds'
import ColumnBrushVue from '@/components/d3/finished/ParallelCoord/ColumnBrush.vue'
export default {
  name:       'ParallelCoordsDemo',
  mixins:     [bounds],
  components: {
    ColumnBrush: ColumnBrushVue
  },
  data() {
    return {
      dataset: [],
      range:   [0, 10]
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/cars.csv').then(d => {
      this.dataset = d
    })
  }
}
</script>

<style lang="scss" scoped>
svg {
  top: 0;
  left: 0;
  fill: #000;
  background-color: lighten(#000, 10);
}
</style>
