<script setup lang="ts">
	const props = defineProps<{
		title: string
		variant?: keyof typeof Variants
	}>()
	const Variants = {
		purple: 'bg-purple-400',
		green: 'bg-green-400',
		red: 'bg-red-400',
		yellow: 'bg-yellow-400'
	}
</script>

<template>
	<button class="px-4 py-2 rounded-lg" :class="[variant && Variants[variant]]">
		{{ props.title }}
	</button>
</template>
