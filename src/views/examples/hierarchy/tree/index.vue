<template>
  <BasePage>
    <div ref="readme" slot="readme" v-html="readme"></div>
    <div class="demo-inner" ref="example" slot="example">
      <div class="svg-inner">
        <DemoComponent ref="layout">
          <div
            @click="randomizeStyle($event, item)"
            class="fill"
            slot-scope="{ item }"
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
