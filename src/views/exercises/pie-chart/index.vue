<template>
  <base-page>

    <div slot="readme"
         ref="readme"
         v-html="readme" />

    <div slot="example"
         ref="example">
      <svg>
        <d3-pie :padAngle="0.02" />
      </svg>
    </div>

  </base-page>

</template>

<script>
import readme from './readme.md'
import BasePage from '@/views/BasePage.vue'
import D3Pie from '@/components/d3/finished/D3Pie.vue'
// import WordCloud from '@/components/d3/finished/WordCloud.vue'
export default {
  data() {
    return {
      readme,
      cloudText: null,
      svgSize: [1000, 1000],
      rotations: [0, 360],
      seansRadius: v => (Math.random() > 0.5 ? 0 : 90 * Math.PI / 180)
    }
  },
  components: {
    BasePage,
    D3Pie
  }
}
</script>