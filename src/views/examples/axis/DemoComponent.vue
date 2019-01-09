<template>
  <div class="main fill">

    <div class="axis-display">
      <label>Linear Axis Component</label>
      <svg class="fill" ref="svg">
        <d3-axis :scale="axisScale"
                 position="bottom" />
      </svg>
    </div>

    <div class="axis-display">
      <label>Time Axis Component</label>
      <svg class="fill">
        <d3-axis :scale="tScale"
                 position="bottom"
                 :count="10">

          <template slot-scope="item">
            <text>{{item.value | timeFormat}}</text>
          </template>

        </d3-axis>
      </svg>
    </div>

    <div class="axis-display">
      <label>Logarithmic Axis Component (Base 10)</label>
      <svg class="fill">
        <d3-axis :scale="lScale"
                 position="bottom"
                 :count="10">

          <template slot-scope="item">
            <text>{{item.value}}</text>
          </template>

        </d3-axis>
      </svg>
    </div>

    <div class="axis-display">
      <label>Pow Axis Component (Exp .25)</label>
      <svg class="fill">
        <d3-axis :scale="pScale"
                 position="bottom"
                 :count="10">

          <template slot-scope="item">
            <text>{{item.value}}</text>
          </template>

        </d3-axis>
      </svg>
    </div>
  </div>
</template>

<script>
import bounds from '@/utils/mixins/bounds.js'
import D3AxisVue from '@/components/d3/finished/D3Axis.vue'
import {
  scaleLinear,
  scaleTime,
  timeFormat,
  scaleLog,
  // scaleSqrt,
  scaleQuantize,
  // scaleQuantile,
  scalePow
} from 'd3'
export default {
  mixins:  [bounds],
  filters: {
    timeFormat(val) {
      return timeFormat('%b %y')(val)
    }
  },
  data() {
    return {
      dimensions: {
        width:  0,
        height: 0
      }
    }
  },
  components: {
    D3Axis: D3AxisVue
  },
  computed: {
    axisScale() {
      return scaleLinear()
        .domain([0, 100])
        .range([0, this.dimensions.width || 500])
    },
    tScale() {
      return scaleTime()
        .domain([new Date('9/2/1985'), Date.now()])
        .nice(10)
        .range([0, this.dimensions.width || 500])
    },
    lScale() {
      return scaleLog()
        .domain([1, 10])
        .range([0, this.dimensions.width || 500])
        .nice(10)
        .base(10)
    },
    pScale() {
      return scalePow()
        .domain([1, 100])
        .range([0, this.dimensions.width || 500])
        .nice(10)
        .exponent(0.25)
    },
    // ! COFFEE BRB
    qzScale() {
      return scaleQuantize()
        .range([
          0,
          6,
          50,
          90,
          100,
          20,
          10,
          100,
          200,
          90,
          20,
          this.dimensions.width || 500
        ])
        .domain([1, 10])
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  display: grid;
  position: relative;
  row-gap: 20px;
  grid: repeat(4, 100px) 1fr / repeat(2, 1fr);
}

svg.fill {
  position: relative;
  top: auto;
  left: auto;
}

.axis-display {
  // border: 1px solid #fff;
  background: darken(#fff, 3);
  color: lighten(#000, 5);
  padding: 20px 40px;
  position: relative;
  width: 100%;
  height: 100%;

  > label {
    text-align: center;
    display: block;
    margin-bottom: 15px;
  }

  > svg {
    width: 100%;
    height: 100%;
    border-top: 1px solid #000;

    /deep/ text {
      fill: lighten(#000, 5);
      font-weight: bold;
    }

    /deep/ line {
      stroke: #000;
    }
  }
}
</style>
