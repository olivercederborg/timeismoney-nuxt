import { msToTime } from '@/composables/msToTime'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export const exportJson = sessions => {
	const doc = new jsPDF('p', 'pt', 'a4', true)

	let totalTime = 0

	sessions.forEach(item => {
		totalTime += parseInt(item.rawTime)
	})

	const tabledSessions = sessions.map((item, i) => {
		return [`${i + 1}`, item.time]
	})

	const hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24)

	autoTable(doc, {
		head: [['Session', 'Time']],
		body: [
			...tabledSessions,
			[
				`Total sessions: ${sessions.length}`,
				`Total time: ${msToTime(totalTime)}`
			],
			['Total pay', `$${70 * hours}`]
		]
	})
	doc.save(`${Date.now()}.pdf`)
}
