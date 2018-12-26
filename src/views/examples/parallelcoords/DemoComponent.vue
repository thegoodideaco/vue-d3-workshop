<template>
  <div class="fill content">
    <!-- Parallel Coordinate Display -->
    <ParallelCoord
      v-if="dataset"
      class="coord"
      ref="svg"
      :ignored-dimensions="['name']"
      :dataset="dataset"
      :curve-name="curveName"
      v-bind="dimensions"
      :include-keys="['cylinders', '0-60 mph (s)', 'power (hp)', 'year']"
      @filtered="output = $event"
    />

    <AgGridVue class="ag-theme-material" v-if="dataset" v-bind="tableOptions" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import { AgGridVue } from 'ag-grid-vue'
import ParallelCoord from '@/components/d3/finished/ParallelCoord/index.vue'

const curveNames = Object.keys(d3).filter(v => v.startsWith('curve'))

export default {
  name:       'ParallelCoordsDemo',
  components: {
    ParallelCoord,
    AgGridVue
  },
  data() {
    return {
      dataset:    null,
      sampled:    null,
      output:     [],
      dimensions: {
        width:  700,
        height: 700
        // viewBox: '0 0 700 700'
      },
      curveName: 'curveLinear'
    }
  },
  computed: {
    tableOptions() {
      return {
        rowData:    this.output,
        pagination: true,
        columnDefs: this.output[0]
          ? Object.keys(this.output[0]).map(v => {
            return {
              // headerName: 'Col A',
              field: v
            }
          })
          : null,
        enableSorting:   true,
        enableColResize: true
      }
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/cars.csv').then(d => {
      this.updateDimensions()
      this.dataset = d
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
