<template>
  <svg class="parallel-coords"
       :width="width"
       :height="height">

    <!-- Will contain all of the lines -->
    <!-- <g class="datum-display">
      <path v-for="(item, index) in dataset"
            :key="index"
            fill="transparent"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="1.5"
            :d="line(item)" />
    </g> -->
    <g class="datum-display"
       v-if="hugeLine()">
      <path fill="transparent"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="1.5"
            class="path-render"
            :d="hugeLine()" />
    </g>

    <!-- Contains the dimension columns -->
    <!-- Each dimension will contain it's own brush -->
    <g class="dimensions">
      <dimension-column v-for="(dim, index) in yValues"
                        :key="index"
                        :x="x(index)"
                        :scale="dim" />

    </g>

  </svg>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import * as crossfilter from 'crossfilter2'
import DimensionColumn from './DimensionColumn.vue'
// const
const bundle = d3.curveBundle
bundle.beta(0.2)
// window.d3 = d3
export default {
  data() {
    return {
      sampled: [],
      // These will contain the y values of each item, named by dimension key
      yValues: {},

      viewBox: null,

      filtered: null
    }
  },
  components: {
    DimensionColumn
  },
  props: {
    dataset: {
      type: Array
    },
    curveName: {
      type: [String, Function],
      default: bundle
    },
    // Represents the dimensions that will NOT display
    // As some data might have unwanted dimensions to use
    ignoredDimensions: {
      type: Array,
      default() {
        return ['name']
      }
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  computed: {
    dimensionKeys() {
      if (this.dataset) {
        return Object.keys(this.dataset[0]).filter(v => {
          return this.ignoredDimensions.some(b => b !== v)
        })
      }
    },

    cross() {
      if (this.dataset) {
        const cf = crossfilter(this.dataset)
        cf.onChange(v => {
          this.filtered = cf.allFiltered()
          console.log('col')
        })
        return cf
      }
    },

    dimensions() {
      if (this.cross) {
        return this.dimensionKeys.reduce((prev, v) => {
          prev[v] = this.cross.dimension(d => d[v]).filterAll()
          return prev
        }, {})
      }
    },

    /**
     * Contains scales for the x, as well as all yscales for each dimension
     */
    scales() {
      if (!this.dataset) return
      // const x = d3.scalePoint()

      // We then construct y scales for each dimension
      // The dimension scale container is an object, where each
      // scale is represented by it's matching key
      const dimensionScales = this.dimensionKeys.reduce((prev, k) => {
        const [min, max] = d3.extent(this.dataset, v => +v[k])
        const scale = d3
          .scaleLinear()
          .domain([min, max])
          .range([this.height, 0])
          .clamp(false)

        prev.push(scale)
        this.yValues[k] = scale

        return prev
      }, [])

      return dimensionScales
    },

    // Returns the x value of a given scale
    x() {
      return d3
        .scalePoint()
        .domain(this.dimensionKeys)
        .range([0, this.width])
    }
  },

  // set original value
  mounted() {
    this.viewBox = `0 0 ${this.width} ${this.height}`
  },
  methods: {
    line(datum) {
      const points = this.scales.map((s, i) => {
        const k = this.dimensionKeys[i]
        // return an array
        const x = this.x(k)
        const y = s(datum[k])

        return [x, y]
      })

      // console.log(points)

      return (
        d3
          .line()
          // .curve(d3(points)
          .curve(d3[this.curveName])(points)
      )
    },
    hugeLine() {
      if (this.dataset) {
        return this.dataset.map(v => this.line(v)).join()
      }
    },
    randomSample(amount) {
      this.sampled = _.sampleSize(this.dataset, amount)
    },
    refreshViewbox() {
      this.viewBox = `0 0 ${this.width} ${this.height}`
    }
  },
  watch: {
    dataset: {
      handler() {
        this.randomSample(50)
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.path-render {
  shape-rendering: optimizeSpeed;
  stroke-opacity: 0.4;
  stroke: #fff;
}
.datum-display {
  transform: translateZ(0);
}
circle {
  fill: #fff;
}
</style>
