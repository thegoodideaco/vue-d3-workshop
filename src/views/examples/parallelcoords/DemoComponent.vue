<template>
  <div class="fill content">

    <div>
      <h2>total filtered: {{allFiltered.length}}</h2>
      <small v-if="tempNames">
        {{tempNames}}
      </small>
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
import ParallelCoords from '@/components/d3/finished/ParallelCoord/index.vue'
export default {
  components: {
    ParallelCoords
  },
  data() {
    return {
      dataset:           null,
      ignoredDimensions: ['name'],
      allFiltered:       []
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
     * TODO: remove this
     */
    tempNames() {
      if (this.allFiltered.length <= 10) {
        return this.allFiltered.map(v => v.name)
      }
    }
  },
  beforeCreate() {
    d3.csv('/static/demo_data/cars.csv').then(d => {
      // filter and set numbers
      const cleaned = d.reduce((prev, cur) => {
        // return entries forced to numbers
        const entries = Object.entries(cur).map(v => {
          // change date to a date object
          // if (v[0] === 'date') {
          //   return [v[0], new Date(v[1])]
          // }

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
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid: 100px 1fr / 100%;

  &__container {
    padding: 20px;
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
