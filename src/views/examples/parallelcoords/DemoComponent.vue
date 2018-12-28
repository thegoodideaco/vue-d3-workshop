<template>
  <div class="fill content">
    <small v-if="range">{{range}}</small>
    <small v-else>No range selected</small>

    <!-- Brush Display -->
    <svg v-bind="dimensions">

      <!-- Column brush -->
      <g is="ColumnBrush"
         v-if="dimensions.height"
         :height="dimensions.height"
         :x="100"
         :domain="[1,200]"
         v-model="range" />
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import bounds from '@/utils/mixins/bounds'
import ColumnBrushVue from '@/components/d3/finished/ParallelCoord/ColumnBrush.vue'
export default {
  mixins:     [bounds],
  components: {
    ColumnBrush: ColumnBrushVue
  },
  data() {
    return {
      dataset: [],
      range:   null,
      test:    200
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
