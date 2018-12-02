<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
      Hello
    </div>
  </base-page>

</template>

<script>
import readme from '@md/4 - Excercise 1.md'
import BasePage from '@/views/BasePage.vue'
export default {
  data() {
    return {
      readme
    }
  },
  components: {
    BasePage
  }
}
</script>