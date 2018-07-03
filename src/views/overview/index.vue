<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
      <!-- <word-cloud v-bind="cloudOptions" /> -->
      <geo-map />
    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '@/views/BasePage'
export default {
  data() {
    return {
      readme,
      cloudOptions: {
        value: null,
        size: [1000, 1000],
        rotate: v => (Math.random() > 0.5 ? 0 : 90 * Math.PI / 180),
        immediate: true
      }
    }
  },
  components: {
    BasePage,
    GeoMap: () => import('@/components/d3/finished/VersorDrag')
  },
  mounted() {
    this.$nextTick(() => {
      const rect = this.$refs.example.getBoundingClientRect()
      this.cloudOptions.size = [rect.width, rect.height]
      this.cloudOptions.value = this.$refs.readme.innerText
    })
  }
}
</script>