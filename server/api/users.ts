import type { IncomingMessage, ServerResponse } from 'http'

export default async (req: IncomingMessage, res: ServerResponse) => {
	const users = await fetch('https://jsonplaceholder.typicode.com/users')
	const result = users.json()

	return result
}
