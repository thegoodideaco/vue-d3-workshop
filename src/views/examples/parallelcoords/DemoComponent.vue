<template>
  <div class="fill content">

    <div class="filter-info">
      <ul v-if="tempNames"
          class="name-list">
        <li v-for="(item,index) in tempNames"
            :key="index"
            :title="item | asString"
            @click="findImage(item.name)">
          {{item.name}}
        </li>
      </ul>
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
import ParallelCoords from '@/components/d3/finished/ParallelCoord/index.vue'
import _ from 'lodash'
import { csv } from 'd3'
import * as ar from 'd3-array'
export default {
  components: {
    ParallelCoords
  },
  filters: {
    asString(object) {
      return Object.entries(object)
        .map(v => {
          return `${v[0]}: ${v[1]}`
        })
        .join('\n')
    }
  },
  data() {
    return {
      dataset:           null,
      ignoredDimensions: ['name', 'id', 'group'],
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
      return _.sampleSize(this.allFiltered, 50)
    }
  },
  beforeCreate() {
    csv('/static/demo_data/nutrients.csv').then(d => {
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
  },
  methods: {
    findImage(str) {
      const url = encodeURIComponent(str)
      open(`https://www.google.com/search?q=${url}&source=lnms&tbm=isch`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid: 1fr / minmax(230px, 1fr) 4fr;
  column-gap: 50px;

  &__container {
    padding: 20px;
  }
}

.filter-info {
  max-height: 100%;
  overflow: auto;
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

.name-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;

  > li {
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      color: #0dffa1;
    }
  }
}
</style>
