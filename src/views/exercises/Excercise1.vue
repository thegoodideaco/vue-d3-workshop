<template>
    <div>
        <h2>Cool Dude</h2>
        <value-slider name="xVal"
                      v-model.number="xVal"
                      :domain="[-1000, 1000]" />
    </div>
</template>

<script>
export default {
  data() {
    return {
      xVal: 20
    }
  },
  components: {
    ValueSlider: () => import('@/components/base/ValueSlider')
  }
}
</script>

<style>
</style>
