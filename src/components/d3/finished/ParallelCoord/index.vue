<template>
  <svg class="parallel-coords"
       ref="svg"
       :width="dimensions.width"
       :height="dimensions.height">

    <!-- All Lines -->
    <g class="line-container back">

      <!-- <path v-for="(item, index) in dataset"
            :key="index"
            :d="generateLine(item)"
            fill="none"
            stroke="#fff"
            stroke-width="1" /> -->
    </g>

    <!-- Filtered Lines -->
    <g class="line-container">

      <!-- Filtered -->
      <path v-for="(item, index) in filteredSample"
            :key="index"
            :d="generateLine(item)"
            fill="none"
            stroke="#fff"
            stroke-width="1" />
    </g>

    <!-- Column Brushes -->
    <g class="column-container"
       v-if="dimensions.height">
      <g is="DefaultColumn"
         v-for="(item,key) in columnObjects"
         :key="key"
         :dimension-key="key"
         :x="xScale(key)"
         :height="dimensions.height"
         :cf-dimension="item.dimension"
         v-model="inputs[key]" />
    </g>

  </svg>
</template>

<script>
import bounds from '@/utils/mixins/bounds.js'
import { scalePoint, scaleLinear, line } from 'd3'
import * as shape from 'd3-shape'
import Crossfilter from 'crossfilter2'
import DefaultColumnVue from './DefaultColumn.vue'
import { sampleSize } from 'lodash'

export default {
  name: 'ParallelCoords',

  props: {
    filtered: Array,
    /**
     * The raw data that will be passed
     * to crossfilter
     */
    dataset:  {
      type:     Array,
      required: true
    },

    /**
     * Data object representing each dimension column
     */
    columnData: {
      type: Array,
      default() {
        return [
          {
            name: null
          }
        ]
      }
    }
  },
  mixins:     [bounds],
  components: {
    DefaultColumn: DefaultColumnVue
  },
  data() {
    return {
      // Watch this value to filter all dimensions
      inputs:        {},
      allFiltered:   null,
      columnObjects: null
    }
  },
  computed: {
    xScale() {
      return scalePoint()
        .domain(this.columnData.map(v => v.name))
        .range([0, this.dimensions.width])
    },
    crossFilter() {
      if (this.dataset && this.dimensions.height !== 0) {
        return Crossfilter(this.dataset)
      }
    },
    filteredSample() {
      if (this.filtered) {
        return sampleSize(this.filtered, 300)
      }
    },

    /**
     * Pass in the entries of an item
     */
    lineGenerator() {
      return line()
        .x(entry => {
          return this.xScale(entry[0])
        })
        .y(entry => {
          const yScale = this.columnObjects[entry[0]].yScale
          return yScale(entry[1])
        })
        .curve(shape.curveLinear)
    }
  },
  methods: {
    updateFiltered() {
      this.allFiltered = Object.freeze(this.crossFilter.allFiltered())
    },
    generateLine(item) {
      const keys = Object.keys(this.columnObjects)
      const filtered = keys.map(v => {
        const key = v
        const val = item[key]

        return [key, val]
      })

      return this.lineGenerator(filtered)
    }
  },

  watch: {
    // Create the dimensions
    crossFilter: {
      handler(val) {
        if (val != null) {
          this.columnObjects = this.columnData.reduce((prev, cur) => {
            const key = cur.name
            const dimension = this.crossFilter.dimension(key)
            const filter = dimension.filter
            const x = this.xScale(key)

            const top = dimension.top(1)[0][key]
            const bottom = dimension.bottom(1)[0][key]

            const extent = [bottom, top]

            const yScale = scaleLinear()
              .domain(extent)
              .range([this.dimensions.height, 0])

            prev[key] = {
              name: key,
              dimension,
              filter,
              x,
              extent,
              yScale
            }

            return prev
          }, {})
        }
      },
      immediate: true
    },
    inputs: {
      handler(val) {
        console.log(val)
        if (this.columnObjects == null || val == null) return
        const entries = Object.entries(val)

        // Filter every dimension
        entries.forEach(v => {
          const { dimension, extent } = this.columnObjects[v[0]]
          if (dimension) {
            let r = v[1]
            if (r) {
              r = [...v[1]]
              if (r[1] === extent[1]) {
                r[1]++
              }
              dimension.filterRange(r)
            } else {
              dimension.filter(null)
            }
          }
        })

        this.updateFiltered()
      },
      deep: true
    },
    allFiltered: {
      handler(val) {
        this.$emit('update:filtered', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
svg {
  text {
    fill: #fff;
  }

  .back-line {
    opacity: 0.5;
  }

  .line-container {
    path {
      opacity: 0.25;
    }
  }
}
</style>
