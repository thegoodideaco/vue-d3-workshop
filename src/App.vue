<template>
  <div id="app">
    <SideBar />
    <div class="content-container">
      <Transition name="page-fade" mode="out-in">
        <!-- <keep-alive> -->
        <!-- Give router a unique key for force render -->
        <RouterView :key="$route.fullPath"></RouterView>
        <!-- </keep-alive> -->
      </Transition>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/navigation/SideBar.vue'

export default {
  name:       'App',
  components: {
    SideBar
  },
  computed: {
    routePath() {
      return this.$route.fullPath.split('/').join(' / ')
    }
  }
}
</script>

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
    align-items: stretch;
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
