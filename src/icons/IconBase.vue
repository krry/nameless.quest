<template lang="pug">
svg.icon(
  xmlns="http://www.w3.org/2000/svg"
  :width="width || size"
  :height="height || size"
  :viewBox="viewBox"
  :aria-labelledby="iconName"
  role="presentation"
  :style="{color: iconColor}"
)
  title(
    :id="iconName"
    lang="en"
  ) {{ iconName }}
  g(:fill="iconColor")
    slot
</template>
<script lang="ts">
export default {
	props: {
		iconName: {
			type: String,
			default: '',
		},
		width: {
			type: [Number, String],
			default: 0,
		},
		height: {
			type: [Number, String],
			default: 0,
		},
		size: {
			type: [Number, String],
			default: 24,
		},
		iconColor: {
			type: String,
			default: 'currentColor',
		},
		viewBox: {
			type: String,
			default: '0 0 130 373',
		},
	},
};
</script>
<style lang="postcss" scoped>
.icon {
	vertical-align: middle;
}
</style>
