<template>
  <div class="page-container"
       v-cloak>

    <!-- Readme -->
    <article class="readme"
             v-bar>
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

    <!-- Top Controls -->
    <div class="top-controls animated faster slideInDown">
      <h4>{{componentName | titleCased}}</h4>
      <button @click="openComponent"><span class="fa fa-fw fa-external-link"></span> Open in editor</button>
    </div>

    <!-- Demo Content -->
    <div class="example-content"
         ref="sectionContent">
      <slot name="example">
        <h2>Hello There</h2>
      </slot>
    </div>
  </div>
</template>

<script>
import startCase from 'lodash/startCase'
const _ = {startCase}
export default {
  data() {
    return {
      demoComponent: null
    }
  },
  props: {

  },
  filters: {
    titleCased(str) {
      return _.startCase(str)
    }
  },
  methods: {
    openComponent() {
      const child = this.$children[0]
      if (child) child.openInEditor()
    }
  },
  mounted() {
    // console.log(this.$children[0].$options.__file)
    if (!this.demoComponent) {
      this.$nextTick(() => {
        this.demoComponent = this.$refs.demo ||this.$children[0]
      })
    }
  },
  updated() {
    if (!this.demoComponent) {
      this.$nextTick(() => {
        this.demoComponent = this.$refs.demo ||this.$children[0]
      })
    }
  },
  computed: {
    componentName() {
      const child = this.demoComponent
      if (child) {
        // return child.$options.__file
        return child.$options.name || child.$options.__file
      }
    }
  }
}
</script>

<style scoped lang="scss">
$btn-color: #41b883;
.top-controls {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.41),
    rgba(0, 0, 0, 0) 91%
  );
  padding: 15px;
  display: grid;
  grid: 1fr / 1fr max-content;
  align-items: center;

  > * {
    margin: 0;
  }

  button {
    font-size: 16px;
    background: none;
    padding: 10px 15px;
    color: $btn-color;
    border: 1px dashed $btn-color;
    outline: none;
    cursor: pointer;
    transform: translateY(0);
    translate: transform 200ms ease;

    &:hover {
      color: #fff;
      border-color: lighten($btn-color, 10);
    }

    &:active {
      border-color: darken($btn-color, 10);
      transform: translateY(2px);
    }
  }
}
.page-container {
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  height: 100%;
  grid:
    [row1-start] 'readme controls' min-content [row1-end]
    [row2-start] 'readme demo' 1fr [row2-end]
    / minmax(35%, min-content) 1fr;

  > * {
    &:first-child {
      grid-area: readme;
    }

    &:nth-child(2) {
      grid-area: controls;
    }

    &:nth-child(3) {
      grid-area: demo;
    }
  }
}
</style>
