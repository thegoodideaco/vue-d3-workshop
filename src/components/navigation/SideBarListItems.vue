<template>
    <ul>
        <li v-for="(item, index) in items"
            :key="index">

            <slot v-bind="item">
                <span>{{item}}</span>
            </slot>

            <template v-if="item && item.children">
                <ul is="SideBarListItems"
                    class="sidebar-list"
                    :items="item.children">
                    <template slot-scope="subitem">
                        <slot v-bind="subitem"></slot>
                    </template>
                </ul>
            </template>
        </li>
    </ul>
</template>

<script>
import SideBarListItems from './SideBarListItems'
export default {
  name: 'SideBarListItems',
  props: {
    items: {
      type: Array
    }
  },
  components: {
    SideBarListItems
  }
}
</script>

<style>
</style>
