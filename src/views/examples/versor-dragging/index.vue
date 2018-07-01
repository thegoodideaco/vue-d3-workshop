<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
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
      geoType: 'geoStereographic'
    }
  },
  components: {
    DemoComponent,
    BasePage
  }
}
</script>