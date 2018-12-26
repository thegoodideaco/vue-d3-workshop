<template>
  <BasePage>
    <div slot="readme" ref="readme" v-html="readme"></div>
    <div slot="example" ref="example" class="demo-inner">
      <div class="svg-inner">
        <DemoComponent ref="layout">
          <div
            class="fill"
            slot-scope="{ item }"
            @click="randomizeStyle($event, item)"
          ></div>
        </DemoComponent>
      </div>
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
  },
  methods: {
    randomizeStyle(ev, item) {
      console.log(ev, item)
      this.$refs.layout.asCircle = !this.$refs.layout.asCircle
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-inner {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  .svg-inner {
    margin-top: 10px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex: 1 1 100%;
    border-color: #1cdd87;
    border-style: dashed;
  }
}
</style>
