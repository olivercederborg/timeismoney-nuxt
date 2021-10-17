<script setup lang="ts">
	import useStopWatch from '~~/composables/useStopWatch'
	useMeta({ title: 'Home - Timetrackr' })

	const { formattedTime, isStarted, pause, start, stop, elapsedTime } =
		useStopWatch()
</script>

<template>
	<section class="flex flex-col items-center mt-20">
		<p class="text-7xl">{{ formattedTime }}</p>

		<section class="mt-10">
			<Button
				variant="green"
				title="Start"
				v-if="!isStarted"
				@click="start"
			/>
			<Button
				variant="yellow"
				title="Pause"
				v-else-if="isStarted"
				@click="pause"
			/>
			<Button variant="red" title="Stop" v-if="elapsedTime" @click="stop" />
		</section>
	</section>
</template>
