<template>
  <BasePage v-cloak>
    <!-- Readme -->
    <div slot="readme" ref="readme" v-html="readme" />

    <!-- Example -->
    <div slot="example" class="example" ref="example">
      <div>
        <!-- SVG -->
        <svg><D3Arc v-bind="arcProps" ref="demo" /></svg>

        <!-- Example Controls -->
        <div class="controls">
          <div v-for="(item, index) in arcProps" :key="index">
            <ValueSlider
              :name="index"
              :min="arcRanges[index][0]"
              :max="arcRanges[index][1]"
              :step="0.000000000000001"
              v-model.number="arcProps[index]"
            />
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
import readme from './readme.md'
import BasePage from '@/views/BasePage.vue'
import D3Arc from '@/components/d3/D3Arc'
import ValueSlider from '@/components/base/ValueSlider'
export default {
  data() {
    return {
      readme,
      arcProps: {
        startAngle:   0,
        endAngle:     2,
        innerRadius:  0,
        outerRadius:  300,
        cornerRadius: 0
      },
      arcRanges: {
        cornerRadius: [0, 50],
        endAngle:     [0, 6.283185307179586],
        innerRadius:  [0, 300],
        outerRadius:  [0, 500],
        startAngle:   [0, 6.283185307179586]
      }
    }
  },
  components: {
    // D3Arc: () => import('@/components/d3/D3Arc'),
    D3Arc,
    BasePage,
    ValueSlider
  }
}
</script>

<style lang="scss" scoped>
.example > div {
  display: grid;
  // grid: max-content 1fr / 100%;
  grid:
    [row1-start] 'controls' max-content [row1-end]
    [row2-start] 'demo' 1fr [row2-end]
    / 100%;

  height: 100%;

  > svg {
    grid-area: demo;
  }

  > .controls {
    grid-area: controls;
  }
}
.controls {
  display: flex;

  > * {
    flex: 1 1 100%;
    margin: 5px 10px;
  }
}
</style>
