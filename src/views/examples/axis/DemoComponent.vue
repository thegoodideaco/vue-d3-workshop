<template>
  <div class="fill">
    <svg v-if="dataset"
         :viewBox="viewBox">
      <d3-line :dataset="lineData" />
      <!-- <circle v-for="(item, index) in points"
              :key="index"
              v-bind="item.positioning"
              fill="white" /> -->
    </svg>
  </div>
</template>

<script>
import * as scales from 'd3-scale'
import * as d3 from 'd3-fetch'
import * as axis from 'd3-axis'
import _ from 'lodash'

export default {
  data() {
    return {
      dataset: null,
      size: [300, 300]
    }
  },

  // Once created, load the data
  created() {
    d3.csv('/static/demo_data/time/browser-usage.csv').then(res => {
      // Convert the dataset into multiple arrays for each browser
      this.dataset = res.reduce(
        (prev, curr, i, next) => {
          // Key / Value pairs of current interation
          const pairs = Object.entries(curr)

          for (const obj of pairs) {
            if (obj[0] !== 'date' && !prev.browsers[obj[0]]) {
              prev.browsers[obj[0]] = []
            }

            if (obj[0] !== 'date') {
              prev.browsers[obj[0]].push(_.toNumber(obj[1]))
            } else {
              prev.dates.push(new Date(obj[1]))
            }
          }

          return prev
        },
        {
          dates: [],
          browsers: {}
        }
      )
    })
  },

  mounted() {
    this.$nextTick(() => {
      const bounds = this.$el.getBoundingClientRect()
      this.size = [_.toInteger(bounds.width), _.toInteger(bounds.height)]
    })
  },

  components: {
    D3Line: () => import('@d3/D3Line')
  },

  computed: {
    timeScale() {
      if (!this.dataset) return
      const beginTime = new Date(_.first(this.dataset.dates))
      const endTime = new Date(_.last(this.dataset.dates))

      return scales
        .scaleTime()
        .range([0, this.size[0]])
        .domain([beginTime, endTime])
    },
    yScale() {
      if (!this.dataset) return

      return scales
        .scaleLinear()
        .range([0, this.size[1]])
        .domain([100, 0])
    },
    viewBox() {
      return `0 0 ${this.size[0]} ${this.size[1]}`
    },
    points() {
      if (!this.dataset) return

      return this.dataset.browsers['Firefox'].map((v, i) => {
        const date = this.dataset.dates[i]
        const cx = this.timeScale(date)
        const cy = this.yScale(v)
        const r = 2
        return {
          positioning: {
            cx,
            cy,
            r
          }
        }
      })
    },
    lineData() {
      if (this.points) {
        return this.points.map(v => {
          return [v.positioning.cx, v.positioning.cy]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.fill {
  // padding-left: 100px;
  // padding-right: 10px;
  border: 1px solid #fff;
}

svg {
  left: auto;
  top: auto;

  path {
    stroke-width: 2px;
  }
}
</style>

