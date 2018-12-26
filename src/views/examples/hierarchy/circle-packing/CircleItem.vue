<template>
  <div :style="textStyle">{{ size }}</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    size: {
      type: Number
    }
  },
  computed: {
    textStyle() {
      return {
        fontSize: `${Math.sqrt(this.item.r * 2)}px`
      }
    }
  }
}
</script>

<style scoped lang="scss">
div {
  color: #000;
}
</style>
