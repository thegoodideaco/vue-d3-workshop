<template>
  <li>
    <slot v-bind="{ treeNode }">
      <span>{{ treeNode.data.name }}</span>
    </slot>

    <ul v-if="children">
      <li
        is="RecursiveTree"
        v-bind="$slots"
        v-for="(item, index) in children"
        :key="index"
        :tree-node="item"
      ></li>
    </ul>
  </li>
</template>

<script>
import RecursiveTree from './RecursiveTree'
export default {
  name: 'RecursiveTree',
  data() {
    return {}
  },
  components: {
    RecursiveTree
  },
  props: {
    treeNode: {
      type:     Object,
      required: true
    }
  },
  computed: {
    children() {
      if (this.treeNode) {
        return this.treeNode.children
      }
    }
  }
}
</script>

<style></style>
