<template>
  <div class="fill">
    <parallel-coord class="coord"
                    ref="svg"
                    :ignored-dimensions="['name']"
                    :dataset="dataset"
                    :curve-name="curveName"
                    v-bind="dimensions" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
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
      sampled: null,
      dimensions: {
        width: 700,
        height: 700,
        // viewBox: '0 0 700 700'
      },
      curveName: 'curveLinear'
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/time/browser-usage.csv').then(d => {
      this.updateDimensions()
      this.dataset = d.map(v => {
        return {
          ...v,
          date: new Date(v.date)
        }
      })

      this.sampled = _.sampleSize(this.dataset, 100)
    })
  },
  methods: {
    randomCurve() {
      this.curveName = _.sample(curveNames)
    },
    updateDimensions() {
      // _.debounce(() => {
      this.$nextTick(() => {
        const bounds = this.$el.getBoundingClientRect()
        this.dimensions.width = bounds.width
        this.dimensions.height = bounds.height
        // this.dimensions.viewBox = `0 0 ${bounds.width} ${bounds.height}`
      })
      // }, 50)
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateDimensions)
  },
  activated() {
    window.addEventListener('resize', this.updateDimensions)
  },
  deactivated() {
    window.removeEventListener('resize', this.updateDimensions)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateDimensions)
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
    // stroke: rgba(#fff, 0.15);
    stroke-width: 1px;
    stroke-linecap: round;
  }
}
</style>
