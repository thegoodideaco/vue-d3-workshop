<template>
  <div @click="updateSize()" class="fill" ref="container">
    <small>{{ zoomProps }}</small>

    <ValueSlider
      v-model.number="offset"
      :min="0"
      :max="500000"
      name="Offset"
    ></ValueSlider>
    <ValueSlider
      v-model.number="domain[0]"
      :min="0"
      :max="500000"
      name="Min Range"
    ></ValueSlider>
    <ValueSlider
      v-model.number="domain[1]"
      :min="500001"
      :max="1e6"
      name="Max Range"
    ></ValueSlider>
    <div style="flex: 1; min-height: 0; position: relative; ">
      <svg ref="svg" height="100%" fill="yellow">
        <rect
          width="100%"
          height="100%"
          fill="yellow"
          :transform="transformStyle"
        />
        <D3Axis class="axis" :scale="axisScale" />
      </svg>
    </div>
  </div>
</template>

<script>
import * as scale from 'd3-scale'
import * as fetch from 'd3-fetch'
import * as axis from 'd3-axis'
import * as zoom from 'd3-zoom'
import * as select from 'd3-selection'
import _ from 'lodash'

export default {
  data() {
    return {
      axis:      axis.axisTop(scale.scaleOrdinal()),
      size:      [0, 500],
      domain:    [0, 100000],
      dataset:   null,
      offset:    0,
      zoomProps: {
        k: 0,
        x: 0,
        y: 0
      }
    }
  },

  // * Once created, load / Transform the data
  created() {
    fetch.csv('/static/demo_data/time/browser-usage.csv').then(res => {
      // Convert the dataset into multiple arrays for each browser
      this.dataset = res.reduce(
        (prev, curr) => {
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
              const vd = obj[1]
              const d = new Date(vd)
              prev.dates.push(d)
            }
          }

          return prev
        },
        {
          dates:      [],
          browsers:   {},
          maxPercent: 0
        }
      )
    })
  },

  mounted() {
    this.$nextTick(() => {
      const bounds = this.$refs.svg.getBoundingClientRect()
      this.size = [0, bounds.height]

      this.zoomer.on('zoom', () => {
        const e = select.event

        // if (e.type === 'zoom') {
        this.zoomProps = e.transform
        // }
        // debugger
      })

      select.select(this.$refs.svg).call(this.zoomer)
    })
  },
  computed: {
    axisScale() {
      const offsetRange = this.domain
      offsetRange.forEach(v => v + this.offset)

      this.domain = offsetRange
      return scale
        .scaleLinear()
        .range(this.size)
        .domain(offsetRange)
    },
    zoomer() {
      const z = zoom
        .zoom()
        .scaleExtent([1, 40])
        .translateExtent([[-100, -100], [this.size[1] + 90, this.size[1] + 90]])

      return z
    },
    transformStyle() {
      if (this.zoomProps) {
        const { k, x, y } = this.zoomProps
        return `translate(${x},${y}) scale(${k})`
      }
    }
  },

  methods: {
    updateSize() {
      const bounds = this.$refs.svg.getBoundingClientRect()
      this.size = [0, bounds.height]
    },
    zoomed(v) {
      console.log(v)
      // debugger
    }
  },

  components: {
    D3Axis:      () => import('./D3Axis.vue'),
    ValueSlider: () => import('@/components/base/ValueSlider.vue')
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
  display: flex;
  flex-flow: column nowrap;
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

  /deep/ .axis {
    height: 100%;
    fill: green;
  }

  /deep/ text {
    fill: #fff;
  }
}
</style>
