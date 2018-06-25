<template>
  <div class="example">
    <h2>Shapes yay!</h2>
    <div>
      <svg width="500"
           height="500">
        <d3-line />
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3Scale from 'd3-scale'
import D3Line from '@/components/d3/finished/D3Line'

const dataset = require('@data/quantifiable/populations.json')
const mdTest = require('@md/test.md')
export default {
  data() {
    return {
      dataset: [[12, 50], [40, 70], [50, 10], [80, 30], [143, 90], [180, 20]],
      test: mdTest,
      size: {
        x: 500,
        y: 500
      }
    }
  },
  computed: {
    scale() {
      return d3Scale
        .scaleLinear()
        .range([this.size.x, this.size.y])
        .domain()
    }
  },
  components: {
    D3Line
  }
}
</script>

<style scoped lang="scss">
svg {
  border: 2px solid #fff;
  overflow: visible;
  position: relative;

  g {
    fill: #fff;
    position: relative;
    transform: translateX(50%) translateY(50%);
  }

  text {
  }
}

.example {
  display: flex;
}
</style>
