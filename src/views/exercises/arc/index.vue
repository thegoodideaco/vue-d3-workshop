<template>
  <base-page>

    <!-- Readme -->
    <div slot="readme"
         ref="readme"
         v-html="readme" />

    <!-- Example -->
    <div slot="example"
         class="example"
         ref="example">

      <!-- Example Controls -->
      <div class="controls">
        <div v-for="(item, index) in arcProps"
             :key="index">
          <!-- <input type="range"
                 :min="arcRanges[index][0]"
                 :max="arcRanges[index][1]"
                 v-model="arcProps[index]"
                 step="0.1"> -->

          <value-slider :name="index"
                        :min="arcRanges[index][0]"
                        :max="arcRanges[index][1]"
                        :step="0.1"
                        v-model.number="arcProps[index]" />
        </div>

      </div>

      <!-- SVG -->
      <svg>
        <d3-arc v-bind="arcProps" />
      </svg>

    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '@/views/BasePage'
// import D3Arc from '@/components/d3/D3Arc'
import ValueSlider from '@/components/base/ValueSlider'
export default {
  data() {
    return {
      readme,
      arcProps: {
        cornerRadius: 0,
        endAngle: 2,
        innerRadius: 0,
        outerRadius: 300,
        startAngle: 0
      },
      arcRanges: {
        cornerRadius: [0, 50],
        endAngle: [0, Math.PI * 2],
        innerRadius: [0, 300],
        outerRadius: [0, 500],
        startAngle: [0, Math.PI * 2]
      }
    }
  },
  components: {
    D3Arc: () => import('@/components/d3/D3Arc'),
    BasePage,
    ValueSlider
  }
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;

  > * {
    flex: 1 0 auto;
    margin: 5px 10px;
  }
}
</style>
