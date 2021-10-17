<script setup lang="ts">
	import { exportJson } from '@/composables/exportJson'
	import { msToTime } from '@/composables/msToTime'
	import useStopWatch from '@/composables/useStopWatch'

	useMeta({ title: 'Home - Timetrackr' })

	const { formattedTime, isStarted, reset, start, stop, elapsedTime } =
		useStopWatch()

	let sessions = ref([])

	onMounted(() => {
		if (localStorage.sessions) {
			sessions.value = JSON.parse(localStorage.sessions)
		} else {
			sessions.value = []
		}
	})

	watch(
		() => [...sessions.value],
		(newVal, prevVal) => {
			localStorage.setItem('sessions', JSON.stringify([...newVal]))
		}
	)

	const totalTime = computed(() => {
		let _totalTime: number = 0
		sessions.value.forEach(item => {
			_totalTime += parseInt(item.rawTime)
		})

		return msToTime(_totalTime)
	})

	const saveSession = () => {
		sessions.value.push({
			time: formattedTime.value,
			rawTime: elapsedTime.value
		})
		reset()
	}

	const clearSessions = () => (sessions.value = [])

	const saveSessions = () => exportJson(sessions.value)
</script>

<template>
	<section class="flex flex-col items-center mt-20">
		<p class="text-7xl">{{ formattedTime }}</p>

		<section class="flex mt-10 space-x-2">
			<Button
				variant="green"
				title="Start"
				v-if="!isStarted"
				@click="start"
			/>
			<Button
				variant="red"
				title="Stop"
				v-else-if="isStarted"
				@click="stop"
			/>
			<Button
				variant="red"
				title="Reset"
				v-if="elapsedTime"
				@click="reset"
			/>
			<Button
				v-if="elapsedTime"
				variant="purple"
				title="Save session"
				@click="saveSession"
			/>
		</section>

		<table v-if="sessions" class="w-full max-w-xl mx-auto mt-20">
			<tr class="text-left">
				<th>Session</th>
				<th class="text-right">Time</th>
			</tr>
			<tr v-for="(session, index) in sessions" :key="index">
				<td>Session {{ index + 1 }}</td>
				<td class="text-right">{{ session.time }}</td>
			</tr>
			<tr>
				<td>Total: {{ sessions.length }}</td>
				<td class="text-right">Total: {{ totalTime }}</td>
			</tr>
		</table>

		<section class="space-x-2">
			<Button
				v-if="sessions.length"
				variant="purple"
				title="Clear sessions"
				@click="clearSessions"
				class="mt-10 rounded-lg"
			/>
			<Button
				v-if="sessions.length"
				variant="purple"
				title="Save as PDF"
				@click="saveSessions"
				class="mt-10 rounded-lg"
			/>
		</section>
	</section>
</template>
