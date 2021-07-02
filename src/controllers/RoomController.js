import connection from '../database/connection'

export const create = async (req, res) => {
	const database = await connection()

	const { room, question, action } = req.params
	const { password } = req.body

	let roomIdExists = false
	let roomId = ''

	do {

		for (let i = 0; i < 6; i++) {
			roomId += Math.floor(Math.random() * 10).toString()
		}

		const roomIds = await database.all(`
			SELECT id FROM rooms
		`)

		roomIdExists = roomIds.some(id => Number(id) === Number(roomId))
		
		if (!roomIdExists){
			await database.run(`
				INSERT INTO rooms VALUES (
					${Number(roomId)},
					'${password}'
				)
			`)
			}
	} while (roomIdExists)

	await database.close()

	return res.redirect(`/room/${roomId}`)
}

export const index = (req, res) => {
	const { room: roomId } = req.params

	return res.render('room', { roomId })
}
