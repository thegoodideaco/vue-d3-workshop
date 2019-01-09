<template>
  <label class="checkbox">
    <input type="checkbox"
           :checked="value"
           @change="emit" />

    <span v-if="$slots.default"
          class="checkbox__label">
      <slot>
        Hello
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  model: {
    prop:  'value',
    event: 'change'
  },
  data() {
    return {}
  },
  methods: {
    /** @param {MouseEvent} event */
    emit(event) {
      this.$emit('change', event.target.checked)
    }
  }
}
</script>

<style scoped lang="scss">
$btn-size: 20px;

.checkbox {
  display: grid;
  grid: auto / auto 1fr;
  align-items: center;
  column-gap: 10px;
  font-size: 16px;
  cursor: pointer;
  input[type='checkbox'] {
    cursor: inherit;
    width: $btn-size;
    height: $btn-size;
  }
}
</style>
