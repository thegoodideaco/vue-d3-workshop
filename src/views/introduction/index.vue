<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
      <word-cloud :value="cloudText"
                  :size="svgSize"
                  :rotate="seansRadius"
                  :immediate="true" />
    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '../BasePage'
import WordCloud from '@/components/d3/finished/WordCloud'
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