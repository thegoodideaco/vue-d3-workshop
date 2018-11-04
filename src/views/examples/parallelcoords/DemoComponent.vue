<template>
  <div class="fill">
    <parallel-coord class="coord"
    :ignored-dimensions="['name']"
                    :dataset="dataset"
                    :curve-name="curveName"
                    v-bind="dimensions" />
  </div>
</template>

<script>
import * as d3 from 'd3'
const curveNames = Object.keys(d3).filter(v => v.startsWith('curve'))

export default {
  name: 'Parallel-Coords',
  components: {
    ParallelCoord: () =>
      import('@/components/d3/finished/ParallelCoord/index.vue')
  },
  data() {
    return {
      dataset: null,
      dimensions: {
        width: 700,
        height: 700
      },
      curveName: 'curveLinear'
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/time/browser-usage.csv').then(d => {
      const bounds = this.$el.getBoundingClientRect()
      this.dimensions.width = bounds.width
      this.dimensions.height = bounds.height
      this.dataset = d.map(v => {
        return {
          ...v,
          date: new Date(v.date)
        }
      })
    })
  },
  methods: {
    randomCurve() {
      this.curveName = _.sample(curveNames)
    }
  }
}
</script>

<style scoped lang="scss">
svg.coord {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  /deep/ path {
    stroke: rgba(#fff, 0.15);
    stroke-width: 1px;
    stroke-linecap: round;
  }
}
</style>
