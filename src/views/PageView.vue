<template>
    <div class="page-container">
        <transition name="page-fade"
                    mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 15px;
}
</style>
