<template>
  <base-page>

    <div slot="readme"
         ref="readme"
         v-html="readme" />

    <div slot="example"
         ref="example">

      <div class="example__inner">
        <div class="pie-container">
          <d3-pie class="pie-svg"
                  v-bind="arcProps" />
        </div>

        <!-- Example Controls -->
        <div class="controls">
          <div v-for="(item, index) in arcProps"
               :key="index">

            <value-slider :name="index"
                          :min="arcRanges[index][0]"
                          :max="arcRanges[index][1]"
                          :step="0.001"
                          v-model.number="arcProps[index]" />
          </div>

        </div>
      </div>
    </div>

  </base-page>

</template>

<script>
import readme from './readme.md'
import BasePage from '@/views/BasePage.vue'
import D3Pie from '@/components/d3/finished/D3Pie.vue'
import ValueSliderVue from '@/components/base/ValueSlider.vue'
// import WordCloud from '@/components/d3/finished/WordCloud.vue'
export default {
  data() {
    return {
      readme,
      arcProps: {
        startAngle: 0,
        endAngle: 6.283,
        innerRadius: 193.379,
        outerRadius: 300,
        cornerRadius: 0,
        padAngle: 0.059
      },
      arcRanges: {
        cornerRadius: [0, 50],
        endAngle: [0, Math.PI * 2],
        innerRadius: [0, 300],
        outerRadius: [0, 500],
        startAngle: [0, Math.PI * 2],
        padAngle: [0, 0.05 * 5]
      }
    }
  },
  components: {
    BasePage,
    D3Pie,
    ValueSlider: ValueSliderVue
  }
}
</script>

<style lang="scss" scoped>
.example__inner {
  display: grid;
  grid:
    [row1-start] 'controls' auto [row1-end]
    [row2-start] 'svg' 1fr [row2-end]
    / 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.pie-container {
  grid-area: svg;
  svg.pie-svg {
    stroke-width: 2px;
    stroke: #fff;
  }
}
.controls {
  display: flex;
  justify-content: space-around;
  grid-area: controls;
}
</style>
