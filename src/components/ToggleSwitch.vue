<template lang="pug">
h4.property {{ label }}
label.container
  input.input(
    type="checkbox"
    v-bind="$attrs"
    :checked="checked"
    @change="$emit('update:checked', $event.target.checked)")
  span.switch
  label.option.dis {{dis}}
  label.option.dat {{dat}}
</template>
<script lang="ts">
export default {
  name: 'ToggleSwitch',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    dis: {
      type: String,
      default: 'dis',
    },
    dat: {
      type: String,
      default: 'dat',
    },
  },
  emits: ['update:checked'],
}
</script>
<style lang="postcss" scoped>
.container {
  --container-width: 4rem;
  --switch-size: calc(var(--container-width) / 2);

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option {
  color: var(--ink);
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 6rem;
}

.dis {
  order: 1;
  text-align: right;
}

.switch {
  order: 2;
}

.dat {
  order: 3;
  text-align: left;
}

/* hide the checkbox input */
.input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.switch {
  /* Vertically center the inner circle */
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-shrink: 0;
  flex-basis: var(--container-width);
  /* Make the container element rounded */
  border-radius: var(--switch-size);
  margin: 0 0.75rem;
  background-color: var(--pencil);
  transition: background-color var(--beat) var(--ease-out-quad);
}

.switch::before {
  content: '';
  position: absolute;
  /* Move a little bit the inner circle to the right */
  left: 0.0625rem;
  height: calc(var(--switch-size) - 0.25rem);
  width: calc(var(--switch-size) - 0.25rem);
  /* Make the inner circle fully rounded */
  border-radius: 100%;
  border: 2px solid var(--pencil);
  background-color: var(--ground);
  transition: transform var(--beat) var(--ease-out-quad);
}

.container:hover + .switch,
.container:focus + .switch {
  background-color: var(--link);
}

.input:checked + .switch {
  background-color: var(--flair);
}

.input:checked + .switch::before {
  border-color: var(--flair);
  /* Move the inner circle to the right */
  transform: translateX(calc(var(--container-width) - var(--switch-size)));
}

.input:focus + .switch::before {
  border-color: var(--link);
}

.input:focus:checked + .switch::before {
  border-color: var(--link);
}

.input:disabled + .switch {
  background-color: var(--dust);
}

.input:disabled + .switch::before {
  background-color: var(--shade);
  border-color: transparent;
}
</style>
