<template>
  <base-page>
    <div slot="readme"
         ref="readme"
         v-html="readme"></div>
    <div slot="example"
         ref="example">
      <svg>
        <d3-arc />
      </svg>
    </div>
  </base-page>

</template>

<script>
import readme from './readme'
import BasePage from '@/views/BasePage'
// import D3Arc from '@/components/d3/D3Arc'
export default {
  data() {
    return {
      readme,
      arcProps: {
        cornerRadius: 0,
        endAngle: 2,
        innerRadius: 0,
        outerRadius: 300,
        startAngle: 0
      }
    }
  },
  components: {
    D3Arc: () => import('@/components/d3/D3Arc'),
    BasePage
  }
}
</script>