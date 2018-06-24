<template>
  <div id="app">
    <side-bar/>
    <div class="content-container">

      <h2 v-if="routePath.length > 0">{{routePath}}</h2>
      <h2 v-else>Introduction</h2>

      <transition name="page-fade"
                  mode="out-in">
        <keep-alive exclude="/">
          <!-- Give router a unique key for force render -->
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import SideBar from './components/navigation/SideBar'
export default {
  name: 'App',
  components: {
    SideBar
  },
  computed: {
    routePath() {
      return this.$route.fullPath
        .slice(1)
        .split('/')
        .join(' / ')
    }
  }
}
</script>

<style src="@/assets/sass/style.scss" lang="scss" />
<style lang="scss">
#app {
  display: flex;
}

.content-container {
  overflow: hidden;
  flex: 1 1 auto;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;

  .page-container {
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
  }

  > h2 {
    font-size: 2.9rem;
    font-weight: 400;
    margin-bottom: 20px;
  }
}
</style>
