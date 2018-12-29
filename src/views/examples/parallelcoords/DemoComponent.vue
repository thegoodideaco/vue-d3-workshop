<template>
  <div class="fill content">

    <div>
      total filtered: {{allFiltered.length}}
    </div>

    <div class="content__container"
         v-if="dataset && dataset.length > 0">

      <!-- SVG Entry -->
      <parallel-coords :dataset="dataset"
                       :column-data="columnData"
                       :filtered.sync="allFiltered" />

    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import bounds from '@/utils/mixins/bounds'
// import ColumnBrushVue from '@/components/d3/finished/ParallelCoord/ColumnBrush.vue'
import CrossFilter from 'crossfilter2'
// import DefaultColumnVue from '@/components/d3/finished/ParallelCoord/DefaultColumn.vue'
import ParallelCoords from '@/components/d3/finished/ParallelCoord/index.vue'
import _ from 'lodash'
import { scalePoint } from 'd3'
export default {
  mixins:  [bounds],
  filters: {
    /** @param {number[]} val */
    rounded(val) {
      if (!val) return null
      return val.map(v => Math.round(v))
    }
  },
  components: {
    // DefaultColumn: DefaultColumnVue,
    ParallelCoords
  },
  data() {
    return {
      dataset: null,

      /** @type {CrossFilter.Crossfilter} */
      crossfilter:       null,
      cfDimensions:      null,
      ignoredDimensions: ['name'],
      rangeValues:       {},
      allFiltered:       []
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/cars.csv').then(d => {
      // filter and set numbers
      const cleaned = d.reduce((prev, cur) => {
        // return entries forced to numbers
        const entries = Object.entries(cur).map(v => {
          const f = parseFloat(v[1])
          const isNumber = !isNaN(f)
          return [v[0], isNumber ? f : v[1]]
        })

        const hasAllValues = entries.every(v => {
          return v[1] != null
        })

        if (hasAllValues) {
          prev.push(
            entries.reduce((p, curv) => {
              const f = parseFloat(curv[1])
              if (!isNaN(f)) {
                p[curv[0]] = f
              } else {
                p[curv[0]] = curv[1]
              }
              return p
            }, {})
          )
        }

        return prev
      }, [])

      // Apply cleaned / formatted data
      this.dataset = cleaned
    })
  },
  watch: {
    dataset: {
      handler(val) {
        if (val) {
          this.crossfilter = CrossFilter(val)

          const unignoredKeys = Object.keys(val[0]).filter(v => {
            return !this.ignoredDimensions.includes(v)
          })

          const keys = unignoredKeys.map(v => {
            return {
              k: v,

              v: this.crossfilter.dimension(v)
            }
          })

          this.cfDimensions = keys
        }
      }
    },

    rangeValues: {
      handler() {
        _.debounce(this.updateFiltered, 100)()
      },
      deep: true
    }
  },
  methods: {
    updateFiltered() {
      if (!this.crossfilter) return

      // Loop thru all dimensions, filter the range

      Object.entries(this.rangeValues).forEach((item, index) => {
        const [
          // eslint-disable-next-line no-unused-vars
          key,
          val
        ] = item

        const dim = this.cfDimensions[index].v
        if (dim) {
          dim.filter(val)
        }
      })

      // ? At this point, all filter caluclations should be finished

      this.allFiltered = Object.freeze(this.crossfilter.allFiltered())
    }
  },
  computed: {
    /**
     * An array of dimension key names
     */
    columnKeys() {
      if (this.dataset) {
        return Object.keys(this.dataset[0]).filter(v => {
          return !this.ignoredDimensions.includes(v)
        })
      }
    },

    /**
     * Creates columns to pass to the parallel coord
     */
    columnData() {
      if (this.columnKeys) {
        return this.columnKeys.map(v => {
          return {
            name: v
          }
        })
      }
    },

    /**
     * Scale used for horizontal alignment
     */
    xScale() {
      if (this.dataset) {
        // Set of column keys
        const keys = this.columnKeys

        return scalePoint()
          .domain(keys)
          .range([0, this.dimensions.width])
      }
    },

    /**
     * Computed line data for objects
     * TODO: put all of this logic into a container component
     * ! Currently do not have an easy way to access an iterable y scale
     */
    lineData() {
      const sample =
        this.allFiltered.length > 50
          ? _.sampleSize(this.allFiltered, 50)
          : this.allFiltered

      // Convert items to line coordinates
      return sample.map(() => {
        return this.columnKeys.reduce((prev, cur) => {
          // const kVal = v[cur]
          const x = this.xScale(cur)
          const y = 0

          prev[cur] = {
            x,
            y
          }

          return prev
        }, {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid: max-content 1fr / 100%;

  &__container {
    padding: 50px;
  }
}
svg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: #000;
  background-color: lighten(#000, 10);
}

.display-info {
  display: grid;
  grid-auto-flow: column;
  column-gap: 20px;
  align-items: center;

  > * {
    display: grid;
    justify-items: center;

    > * {
      margin: 0;
    }
  }
}
</style>
