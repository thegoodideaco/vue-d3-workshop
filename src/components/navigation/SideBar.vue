<template>
    <nav class="side-bar">
        <div class="logo">
            <img src="@/assets/logos-sm.png">
            <p class="small">Composing D3 Visuals with Vue.js</p>
        </div>

        <button class="close-btn">
            <span class="fa fa-remove"></span>
        </button>

        <h2>Table of Contents</h2>

        <ul is="SideBarListItems"
            class="sidebar-list"
            :items="routes">

            <template slot-scope="item">
                <router-link :to="item">
                    <span>{{item.name}}</span>
                </router-link>
            </template>

        </ul>

    </nav>
</template>

<script>
import * as d3 from 'd3'
import SideBarListItems from './SideBarListItems'
export default {
  name: 'SideBar',
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
* {
  box-sizing: border-box;
}
nav.side-bar {
  text-align: left;
  //   min-width: 400px;
  flex: 0 0 auto;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  padding: 20px;
  padding-right: 50px;
  background: rgba(#000, 0.25);
}
.close-btn {
  background: none;
  border: 0;
  color: rgba(#fff, 0.5);
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  outline: 0;
  cursor: pointer;

  &:hover,
  &:active {
    color: #fff;
  }
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

.logo {
  margin-bottom: 50px;
}
</style>
