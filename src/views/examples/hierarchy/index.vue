<template>
  <div class="flex">
    <Transition name="page-fade" mode="out-in">
      <KeepAlive>
        <RouterView v-if="hasChild" :key="$route.path" />
        <BasePage v-else key="$route.fullPath">
          <div slot="readme" ref="readme" v-html="readme"></div>
          <div slot="example" ref="example" class="demo-inner">
            <div class="svg-inner">
              <DemoComponent :tile-style="style">
                <div
                  class="fill"
                  slot-scope="{ item, size }"
                  @click="randomizeStyle(item)"
                >
                  {{ item.data.name }} - size:
                  {{ Math.floor((item.value / size) * 100) }}%
                </div>
              </DemoComponent>
            </div>
          </div>
        </BasePage>
      </KeepAlive>
    </Transition>
  </div>
</template>

<script>
import readme from './readme.md'
import BasePage from '@/views/BasePage.vue'
import MarkdownUtils from '@/utils/mixins/MarkdownUtils'
export default {
  mixins: [MarkdownUtils],
  data() {
    return {
      readme,
      options: [
        'geoAzimuthalEquidistant',
        'geoAzimuthalEqualArea',
        'geoGnomonic',
        'geoOrthographic',
        'geoStereographic',
        'geoConicConformal',
        'geoConicEqualArea',
        'geoConicEquidistant',
        'geoEquirectangular',
        'geoMercator',
        'geoTransverseMercator'
      ],
      style:   1,
      geoType: 'geoMercator'
    }
  },
  components: {
    DemoComponent: () => import('./DemoComponent'),
    BasePage
  },
  methods: {
    randomizeStyle(item) {
      console.log(item)
      this.style = Math.floor(Math.random() * 3)
    }
  },
  computed: {
    hasChild() {
      return this.$route.matched.length > 2
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

.flex {
  display: flex;
  width: 100%;
}
</style>
