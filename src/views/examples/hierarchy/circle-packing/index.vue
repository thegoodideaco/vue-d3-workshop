<template>
  <base-page>

    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example"
         class="demo-inner">

      <div class="svg-inner">
        <demo-component :tileStyle="style">
          <div class="fill"
               slot-scope="{item, size}"
               @click="randomizeStyle(item)">
            {{item.data.name}}
          </div>
        </demo-component>
      </div>
    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '@/views/BasePage'
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
      style: 1,
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
