<template>
  <div v-on="$listeners"
       class="tree-node"
       :class="{active}">
    {{item.x1}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      descendants: null,
      active: false
    }
  },
  props: ['index', 'item', 'size'],
  computed: {
    ['$listeners']() {
      return this.$parent.$listeners
    },
    connectedComponents() {
      return this.descendants ? this.descendants.map(v => v.component) : null
    }
  },
  beforeMount() {
    this.$props.item.component = this
    this.descendants = this.item.descendants()
  }
}
</script>

<style>
.active {
  border: 1px solid black;
}
</style>
