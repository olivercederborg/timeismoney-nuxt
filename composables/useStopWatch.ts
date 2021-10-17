import { ref, computed } from 'vue'

const useStopWatch = () => {
	let startTime = ref(0)
	let elapsedTime = ref(0)
	let timerInterval: NodeJS.Timer
	let isStarted = ref(false)

	const start = () => {
		isStarted.value = true
		startTime.value = Date.now() - elapsedTime.value
		timerInterval = setInterval(() => {
			elapsedTime.value = Date.now() - startTime.value
		}, 10)
	}

	const stop = () => {
		isStarted.value = false
		clearInterval(timerInterval)
	}

	const reset = () => {
		isStarted.value = false
		clearInterval(timerInterval)
		startTime.value = 0
		elapsedTime.value = 0
	}

	const formattedTime = computed(() => {
		let diffInHrs = elapsedTime.value / 3600000
		let hh = Math.floor(diffInHrs)

		let diffInMin = (diffInHrs - hh) * 60
		let mm = Math.floor(diffInMin)

		let diffInSec = (diffInMin - mm) * 60
		let ss = Math.floor(diffInSec)

		let diffInMs = (diffInSec - ss) * 100
		let ms = Math.floor(diffInMs)

		let formattedHH = hh.toString().padStart(2, '0')
		let formattedMM = mm.toString().padStart(2, '0')
		let formattedSS = ss.toString().padStart(2, '0')
		let formattedMS = ms.toString().padStart(2, '0')

		return `${
			!!hh ? formattedHH + ':' : ''
		}${formattedMM}:${formattedSS}:${formattedMS}`
	})

	return { formattedTime, start, stop, reset, isStarted, elapsedTime }
}

export default useStopWatch
