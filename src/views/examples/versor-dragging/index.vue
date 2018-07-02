<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
      <!-- Options -->
      <select name="projections"
              v-model="geoType">
        <option v-for="(item, index) in options"
                :key="index">{{item}}</option>
      </select>

      <demo-component :projector-type="geoType" />
    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '@/views/BasePage'
import DemoComponent from './DemoComponent'
// import VersorDrag from '@/components/d3/finished/VersorDrag'
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
      geoType: 'geoStereographic'
    }
  },
  components: {
    DemoComponent,
    BasePage
  }
}
</script>