<template>
  <div class="page-container">
    <Transition name="page-fade" mode="out-in">
      <KeepAlive><RouterView></RouterView></KeepAlive>
    </Transition>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 15px;
}
</style>
