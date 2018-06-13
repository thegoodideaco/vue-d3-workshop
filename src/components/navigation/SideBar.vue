<template>
    <nav class="side-bar">
        <div class="logo">
            <img src="@/assets/logos-sm.png">
            <h3>Subtitle Goes Here</h3>
        </div>

        <button class="close-btn"></button>

        <h2>Table of Contents</h2>
    </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
nav.side-bar {
  text-align: left;
  width: 300px;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  padding: 20px;
  background: rgba(#000, 0.25);
}
.close-btn {
    background: none;
}
</style>
