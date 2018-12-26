<template>
  <nav class="side-bar">
    <div class="logo">
      <img src="@/assets/logos-sm.png" />
      <p class="small">Composing D3 Visuals with Vue.js</p>
    </div>

    <h2>Table of Contents</h2>

    <div v-bar>
      <ul is="SideBarListItems" class="sidebar-list" :items="routes">
        <template slot-scope="item">
          <RouterLink :to="item">
            <span>{{ item.name }}</span>
          </RouterLink>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import SideBarListItems from './SideBarListItems'
export default {
  name:       'SideBar',
  components: {
    SideBarListItems
  },
  data() {
    return {
      routes: null
    }
  },
  beforeMount() {
    this.routes = this.$router.options.routes
  }
}
</script>

<style lang="scss">
nav.side-bar {
  user-select: none;
  font-size: 0.7em;
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
  //   min-width: 400px;
  flex: 0 0 auto;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  padding: 20px;
  // padding-right: 50px;
  background: rgba(#000, 0.25);

  > * {
    flex: 0;

    &:last-child {
      flex: 1 1 auto;
      overflow: auto;
      height: fit-content;
    }
  }
}

.logo {
  margin-bottom: 50px;
}

.sidebar-list {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
  margin-top: 10px;
  padding-left: 10px;

  .sidebar-list {
    > li {
      padding: 8px;
      border-left: 2px solid rgb(0, 128, 0);
    }
  }

  > li {
    padding-top: 10px;
  }
}
</style>
