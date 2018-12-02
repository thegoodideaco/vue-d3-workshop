<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme" />
    <div slot="example"
         ref="example"
         class="demo-inner">

      <div class="svg-inner fill">
        <demo-component />
      </div>
    </div>
  </base-page>

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
