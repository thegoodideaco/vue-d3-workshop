<template>
  <g v-if="nodePosition" :transform="transformProps">
    <circle :class="{ active: active }" r="10" @click="itemClick()" />

    <slot name="circle">
      <text>{{ treeNode.data.name }}</text>
    </slot>
    <!-- </circle> -->
    <g>
      <slot>
        <text>{{ treeNode.data.name }}</text>
      </slot>
    </g>
  </g>
</template>

<script>

export default {
  data() {
    return {
      active: false
    }
  },
  props: {
    treeNode: {
      type:     Object,
      required: true
    },
    rootNode: {
      type:     Object,
      required: true
    }
  },
  computed: {
    index() {
      if (this.rootNode) {
        return this.rootNode.descendants().indexOf(this.treeNode)
      }
    },
    nodePosition() {
      if (this.treeNode) {
        return {
          x: (this.treeNode.depth - this.treeNode.height) * 50,
          y: this.treeNode.y
        }
      }
    },
    transformProps() {
      if (this.nodePosition) {
        const x = this.nodePosition.x
        const y = this.nodePosition.y
        return `translate(${x}, ${y})`
      }
    },
    descendantComponents() {
      if (this.treeNode) {
        return this.treeNode
          .descendants()
          .map(v => v.component)
          .slice(1)
      }
    }
  },
  methods: {
    itemClick() {
      console.log(
        this.descendantComponents.map(v => v.treeNode.data.name),
        this.treeNode.value
      )
      if (!this.descendantComponents) return
      this.descendantComponents.forEach(v => (v.active = !v.active))
    }
  },
  watch: {
    treeNode: {
      handler(val) {
        Object.assign(val, {
          component: this
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
circle {
  fill: #fff;

  &.active {
    fill: green;
  }
}
</style>
