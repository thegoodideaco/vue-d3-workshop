<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example"
         class="demo-inner">
      <!-- Options -->
      <select name="projections"
      ref="dropdown"
              v-model="geoType">
        <option v-for="(item, index) in options"
                :key="index">{{item}}</option>
      </select>

      <div class="svg-inner">
        <demo-component :projector-type="geoType" />
      </div>
    </div>
  </base-page>

</template>

<script>
import readme from './readme.md'
import BasePage from '@/views/BasePage.vue'
export default {
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
      geoType: 'geoMercator'
    }
  },
  components: {
    DemoComponent: () => import('@/components/d3/finished/VersorDrag'),
    BasePage
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.dropdown.focus()
    })
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
