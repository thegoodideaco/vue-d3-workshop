<template>
  <div class="fill content">

    <div class="filter-info">

      <value-slider name="Threshold"
                    class="slider"
                    :min="20"
                    :max="500"
                    v-model="$data.$sampleAmount" />

      <div class="item-container"
           v-bar>
        <div>
          <ul class="name-list gpu">
            <li v-for="(item,index) in filteredSample"
                :key="index"
                @mouseover="activeItem = item"
                @mouseleave="activeItem = null"
                @click="findImage(item.name)">
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content__container"
         v-if="dataset && dataset.length > 0">

      <!-- SVG Entry -->
      <parallel-coords :dataset="dataset"
                       :column-data="columnData"
                       :filtered.sync="allFiltered"
                       :filtered-sample.sync="filteredSample"
                       :render-count="$data.$sampleAmount"
                       :active-item="activeItem" />

    </div>
  </div>
</template>

<script>
import ParallelCoords from '@/components/d3/finished/ParallelCoord/index.vue'
// import _ from 'lodash'
import { csv } from 'd3'
import ValueSliderVue from '@/components/base/ValueSlider.vue'
export default {
  data() {
    return {
      $sampleAmount:     100,
      dataset:           null,
      ignoredDimensions: ['name', 'id', 'group'],
      allFiltered:       [],
      filteredSample:    null,
      activeItem:        null
    }
  },

  /**
   * Load the csv data,
   * clean the data, apply to dataset
   */
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
  components: {
    ParallelCoords,
    ValueSlider: ValueSliderVue
  },
  computed: {
    /** An array of dimension key names */
    columnKeys() {
      if (this.dataset) {
        return Object.keys(this.dataset[0]).filter(v => {
          return !this.ignoredDimensions.includes(v)
        })
      }
    },

    /** Creates columns to pass to the parallel coord */
    columnData() {
      if (this.columnKeys) {
        return this.columnKeys.map(v => {
          return {
            name: v
          }
        })
      }
    }
  },
  methods: {
    findImage(str) {
      const url = encodeURIComponent(str)
      open(
        `https://www.google.com/search?q=${url}&source=lnms&tbm=isch`,
        '_blank'
      )
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
  overflow: hidden;
  display: grid;
  grid: auto 1fr / 100%;
  row-gap: 10px;

  > .slider {
  }

  .name-list {
    list-style: none;
    padding: 10px;
    padding-left: 0;
    padding-right: 25px;
    margin: 0;
    font-size: 12px;
    max-height: 100%;
    // overflow: auto;
    position: relative;
    will-change: contents;

    > li {
      cursor: pointer;

      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover,
      &:active,
      &:focus {
        color: #0dffa1;
      }
    }
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
