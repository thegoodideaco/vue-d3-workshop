<template>
  <div id="app">
    <side-bar/>
    <div class="content-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from './components/navigation/SideBar'
export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style src="@/assets/sass/style.scss" lang="scss" />
<style>
#app {
  display: flex;
}

.content-container {
  flex: 1 1 auto;
}
</style>
