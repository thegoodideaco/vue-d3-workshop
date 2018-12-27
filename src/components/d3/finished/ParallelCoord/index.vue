<template>
  <svg class="parallel-coords"
       :width="width"
       :height="height"
       fill="#000">



  </svg>
</template>

<script>
import * as d3 from 'd3'
import * as crossfilter from 'crossfilter2'

window.d3 = d3

export default {
  name:  'ParallelCoord',
  props: {
    dataset: {
      type:     Array,
      required: true
    },
    includeKeys: {
      type:     Array,
      required: true
    }
  },
  components: {
  },
  data() {
    return {
      width:    500,
      height:   500,
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

        /** @type [number, number] */
        const extent = d3.extent(this.dataset, vv => {
          return +vv[v]
        })

        // debugger

        const yScale = d3
          .scaleLinear()
          .domain(extent.reverse())
          .range([0, this.height])

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
      // debugger

      // ? Height is not beig calculated correctly.. bBox maybe?
      const { width, height } = this.$el.getBoundingClientRect()

      // debugger

      this.width = width
      this.height = height
    })
  },
  watch: {
    filtered(val) {
      this.$emit('filtered', val)
    }
  },
  methods: {
    updateDimension(dim, val) {
      dim.filterAll(null)
      this.$nextTick(() => {
        dim.filterRange([val[1], val[0]])
      })
    }
  }
}
</script>
