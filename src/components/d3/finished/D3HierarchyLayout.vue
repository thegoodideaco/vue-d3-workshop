<template>
  <svg v-if="rootNode">

    <!-- Nodes -->
    <g class="nodes">
      <d3-hierarchy-node v-for="(item, index) in rootNode.descendants()"
                         :key="index"
                         :node-data="item"
                         :layout-type="layoutType"
                         :auto-position="autoPosition">
        <slot v-bind="item"></slot>
      </d3-hierarchy-node>
    </g>

    <!-- Links -->
    <g class="links">
      <d3-hierarchy-link v-for="(link, i) in rootNode.descendants()"
                         :key="i" />
    </g>
  </svg>
</template>

<script>
import * as hierarchy from 'd3-hierarchy'
import D3HierarchyNode from './D3HierarchyNode'
import D3HierarchyLink from './D3HierarchyLink'
export default {
  props: {
    autoPosition: {
      type: Object
    },
    dataset: {
      type: Object,
      default() {
        return {
          name: 'root',
          children: [
            {
              name: 'item1',
              children: [
                {
                  name: 'child1'
                }
              ]
            },
            {
              name: 'item2'
            }
          ]
        }
      }
    },
    layoutType: {
      // Types can be treemap, tree, cluster, pack, or parition
      type: String,
      default: 'treemap'
    },
    layoutSize: {
      type: Array,
      default() {
        return [500, 500]
      }
    }
  },
  computed: {
    //  This is essentially the hierarchy
    rootNode() {
      if (this.dataset) {
        let root = hierarchy
          .hierarchy(this.dataset)
          .sum(v => v.size || v.height)
          .sort((a, b) => {
            return b.height - a.height || b.size - a.size
          })

        switch (this.layoutType) {
          case 'tree':
            hierarchy
              .tree()
              .size(this.layoutSize)
              .apply(this, [root])
            break

          case 'treemap':
            hierarchy
              .treemap()
              .size(this.layoutSize)
              .padding(2)
              .tile(hierarchy.treemapBinary)(root)
            break

          case 'partition':
            hierarchy
              .partition()
              .size(this.layoutSize)
              .round(true)
              .padding(2)(root)
            break

          case 'pack':
            hierarchy.pack().size(this.layoutSize)(root)
            break
        }
        //   call a layout that mutates this object
        // TODO: remove tree and make conditionals based on layout type
        // hierarchy.treemap().size(this.layoutSize)(root)
        return root
      }
    },
    descendants() {
      if (this.rootNode) {
        return this.rootNode.descendants()
      }
    }
  },
  components: {
    D3HierarchyNode,
    D3HierarchyLink
  }
}
</script>

<style lang="scss">
text {
  fill: #fff;
}
</style>
