<template>
  <div class="chart-container">
    <chart-comp class="my-chart" />
  </div>
</template>

<script>
import ChartComp from './examples/scaling/DemoComponent'
export default {
  components: {
    ChartComp
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  height: 100%;
  position: relative;

  .my-chart {
    height: 100%;

    /deep/ svg.svg {
        width: 100%;
        height: 100%;
    }
  }
}
</style>

