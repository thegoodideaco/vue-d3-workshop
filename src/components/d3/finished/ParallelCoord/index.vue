<template>
  <svg class="parallel-coords"
       :width="width"
       :height="height"
       fill='#000'>

    <!-- Temp background -->
    <rect width="100%"
          height="100%"
          fill="#000"></rect>

    <line v-for="(item, index) in columnData"
          :key="index"
          :x1="item.x"
          y1="0"
          :x2="item.x"
          :y2="height"
          style="stroke:rgb(255,0,0);stroke-width:2" />

  </svg>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import * as crossfilter from 'crossfilter2'

import DimensionColumn from './DimensionColumn.vue'

window.d3 = d3

export default {
  props: {
    dataset: {
      type: Array,
      required: true
    },
    includeKeys: {
      type: Array,
      required: true
    }
  },
  components: {
    DimensionColumn
  },
  data() {
    return {
      width: 500,
      height: 500,
      filtered: null,
      onChange: cb => {
        console.log(cb)
        if (cb === 'filtered') {
          // update filtered stuff?
          this.filtered = this.cross.allFiltered()
        }
      }
    }
  },
  computed: {
    cross() {
      const val = new crossfilter(this.dataset)
      val.onChange(this.onChange)

      return val
    },
    dimensions() {
      return this.includeKeys.reduce((prev, v) => {
        const dimension = this.cross.dimension(v)
        prev[v] = dimension
        return prev
      }, {})
    },
    xScale() {
      return d3
        .scalePoint()
        .domain(this.includeKeys)
        .rangeRound([0, this.width])
        .padding(0.1)
    },
    columnData() {
      return this.includeKeys.reduce((prev, v) => {
        const dimension = this.dimensions[v]
        const extent = d3.extent(this.dataset, vv => {
          return +vv[v]
        })

        // debugger

        const yScale = d3
          .scaleLinear()
          .domain(extent)
          .range([this.height, 0])

        prev[v] = {
          dimension,
          extent,
          x: this.xScale(v),
          yScale
        }

        return prev
      }, {})
    }
  },
  mounted() {
    this.filtered = this.dataset

    this.$nextTick(() => {
      const { width, height } = this.$el.getBoundingClientRect()

      this.width = width
      this.height = height
    })
  },
  watch: {
    filtered(val) {
      this.$emit('filtered', val)
    }
  }
}
</script>
