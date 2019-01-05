<template>
  <div class="fill"
       ref="container" >

    <!-- SVG Entry -->
    <pan-zoom :h-domain="domain[0]"
              :v-domain="domain[1]"
              :tick-amount="10"
              fill="#000"
              @mousemove.native="test" />

  </div>
</template>

<script>
import indexVue from '@/components/d3/finished/PanZoom/index.vue'
export default {
  data() {
    return {
      // range:  [[0, 100], [0, 500]],
      domain: [[0, 1000], [0, 6000]]
    }
  },
  components: {
    PanZoom: indexVue
  },
  methods: {
    /** @param {MouseEvent} event */
    test() {
      // this.$set(this.domain[0], 1, event.offsetX + 5)
      // this.domain[0][0] = event.clientX
    }
  }
}
</script>

<style lang="scss" scoped>
div.fill {
  border: 1px solid rgba(#fff, 0.5);
  display: flex;
  flex-flow: column nowrap;
}

svg {
  left: auto;
  top: auto;
  width: 100%;
  height: 100%;
}
</style>
