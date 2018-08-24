<template>
  <div class="fill"
       ref="container">

    <!-- SVG Chart -->
    <chart-example :dataset="dataset">
      <text slot="yAxis" slot-scope="{value}">{{value}}</text>
    </chart-example>

  </div>
</template>

<script>
import * as d3 from 'd3-fetch'
import * as axis from 'd3-axis'
import _ from 'lodash'
import ChartExample from './ChartExample'

export default {
  data() {
    return {
      axis: axis.axisTop(),
      dataset: null
    }
  },

  //* Once created, load / Transform the data
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
              const percent = _.toNumber(obj[1])

              // Populate the browser
              prev.browsers[obj[0]].push(percent)

              // Update maxPercentage
              prev.maxPercent = Math.max(percent, prev.maxPercent)
            } else {
              prev.dates.push(new Date(obj[1]))
            }
          }

          return prev
        },
        {
          dates: [],
          browsers: {},
          maxPercent: 0
        }
      )
    })
  },

  components: {
    D3Axis: () => import('./D3Axis'),
    ChartExample
  }
}
</script>

<style lang="scss" scoped>
div.fill {
  padding-left: 200px;
  padding-right: 10px;
  padding-bottom: 100px;
  padding-top: 100px;
  border: 1px solid rgba(#fff, 0.5);
}

.tickerx,
.tickery {
  fill: #fff;

  text {
    text-anchor: end;
  }
}

svg {
  left: auto;
  top: auto;
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  path {
    stroke-width: 2px;

    &.google-chrome {
      stroke: green;
    }
    &.firefox {
      stroke: orange;
    }
    &.microsoft-edge {
      stroke: lighten(blue, 20);
    }
    &.internet-explorer {
      stroke: blue;
    }
    &.opera {
      stroke: red;
    }
    &.safari {
      stroke: yellow;
    }
    &.mozilla {
      stroke: orange;
    }
    &.other-unknown {
      stroke: pink;
    }
  }
}
</style>

