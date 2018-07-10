<template>
  <div class="page-container">
    <article v-bar>
      <section ref="cloudContent">
        <div>
          <div class="section-content">
            <div class="section-inner sectionLayout--insetColumn gpu">
              <slot name="readme">
                <h2>Put Readme Content Here</h2>
              </slot>
            </div>
          </div>
        </div>
      </section>

    </article>
    <div class="example-content"
         ref="sectionContent">
      <slot name="example">
        <h2>Hello There</h2>
      </slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
