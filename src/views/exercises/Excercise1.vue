<template>
    <div>
        <value-slider name="xVal"
                      v-model.number="xVal"
                      :scaled-value.sync="scaledValue"
                      :domain="[-1000, 1000]" />

        <p>Scaled Value: {{scaledValue}}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      xVal: 20,
      scaledValue: null
    }
  },
  components: {
    ValueSlider: () => import('@/components/base/ValueSlider')
  }
}
</script>

<style>
</style>
