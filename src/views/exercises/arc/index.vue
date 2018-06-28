<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
      <svg>
        <d3-arc/>
      </svg>
    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '@/views/BasePage'
import WordCloud from '@/components/d3/finished/WordCloud'
import D3Arc from '@/components/d3/D3Arc'
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
    WordCloud,
    DemoComponent: () => import('./component'),
    D3Arc,
    BasePage
  },
  mounted() {
    this.$nextTick(() => {
      const rect = this.$refs.example.getBoundingClientRect()
      this.svgSize = [rect.width, rect.height]
      //   this.$data._words = _.words(this.$el.innerText)
      console.log(this.$el.innerText)
      this.cloudText = this.$refs.readme.innerText
    })
  }
}
</script>