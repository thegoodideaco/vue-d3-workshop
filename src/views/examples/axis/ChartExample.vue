<template>
  <svg :viewBox="viewBox" ref="chart">
    <g v-if="dataset">
      <!-- <d3-axis class="tickerx" /> -->

      <g class="yAxis" transform="translate(-10,0)" text-anchor="end">
        <g v-for="(item, index) in yTicks" :key="index">
          <slot name="yAxis" :value="item"><text>Slot Goes Here</text></slot>
        </g>
      </g>
    </g>
    <!-- <circle v-for="(item, index) in points"
              :key="index"
              v-bind="item.positioning"
              fill="white" /> -->
  </svg>
</template>

<script>
import * as scales from 'd3-scale'
import _ from 'lodash'
export default {
  data() {
    return {
      size:            [300, 300],
      offsetSize:      [300, 300],
      offsetPosition:  [0, 0],
      chartBounds:     null,
      containerBounds: null,
      tickAmount:      10
    }
  },
  props: {
    dataset: {
      type: Object
    }
  },
  filters: {
    normalize(val) {
      return _.kebabCase(val)
    }
  },
  methods: {
    // Return a multidimensional array of x and y points [[x,y]]
    getPositionPoints(browser) {
      if (!this.browserNames) return
      return this.dataset.browsers[browser].map((v, i) => {
        return [this.timeScale(this.dataset.dates[i]), this.yScale(v)]
      })
    }
  },

  components: {},
  mounted() {
    this.$nextTick(() => {
      const bounds = this.$el.getBoundingClientRect().toJSON()
      this.containerBounds = bounds
      this.size = [_.toInteger(bounds.width), _.toInteger(bounds.height)]

      this.offsetSize = _.clone(this.size)
    })
  },
  computed: {
    timeScale() {
      if (!this.dataset) return
      const beginTime = new Date(_.first(this.dataset.dates))
      const endTime = new Date(_.last(this.dataset.dates))

      return scales
        .scaleTime()
        .range([
          this.size[0] * 0.5 - this.size[0] * 0.5 + this.offsetPosition[0],
          this.offsetSize[0] + this.offsetPosition[0]
        ])
        .domain([beginTime, endTime])
    },
    yScale() {
      if (!this.dataset) return

      return scales
        .scaleLinear()
        .range([
          this.offsetPosition[1],
          this.offsetSize[1] + this.offsetPosition[1]
        ])
        .domain([this.dataset.maxPercent, 0])
    },
    yTicks() {
      if (this.yScale) {
        return this.yScale.ticks(this.tickAmount)
      }
    },
    viewBox() {
      return `0 0 ${this.size[0]} ${this.size[1]}`
    },
    browserNames() {
      if (this.dataset) {
        return Object.keys(this.dataset.browsers || {})
      }
    }
  }
}
</script>

<style scoped>
text {
  fill: #fff;
}
</style>
