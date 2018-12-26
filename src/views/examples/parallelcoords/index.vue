<template>
  <BasePage class="smaller">
    <div slot="readme" ref="readme" v-html="readme" v-once></div>
    <div slot="example" ref="example" class="demo-inner">
      <div class="svg-inner fill"><DemoComponent /></div>
    </div>
  </BasePage>
</template>

<script>
import readme from './readme.md'
import BasePage from '@/views/BasePage.vue'
import MarkdownUtils from '@/utils/mixins/MarkdownUtils'
export default {
  mixins: [MarkdownUtils],
  data() {
    return {
      readme
    }
  },
  components: {
    DemoComponent: () => import('./DemoComponent'),
    BasePage
  }
}
</script>

<style lang="scss" scoped>
.page-container.smaller {
  grid:
    [row1-start] 'readme controls' min-content [row1-end]
    [row2-start] 'readme demo' 1fr [row2-end]
    / minmax(25%, min-content) 1fr;
}
</style>
