import connection from '../database/connection'

export const create = async (req, res) => {
  const database = await connection()

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

    if (!roomIdExists) {
      await database.run(`
        INSERT INTO rooms VALUES (
          ${Number(roomId)},
          '${password}'
        )
      `)
    }
  } while (roomIdExists)

  await database.close()

  return res.redirect(`/room/${Number(roomId)}`)
}

export const index = async (req, res) => {
  const database = await connection()

  const { room: roomId } = req.params

  const questionsUnread = await database.all(`
    SELECT * FROM questions
      WHERE room = ${roomId}
      AND read = 0
  `)

  const questionsRead = await database.all(`
    SELECT * FROM questions
      WHERE room = ${roomId}
      AND read = 1
  `)

  const noHasQuestions = questionsUnread.length + questionsRead.length === 0

  await database.close()

  return res.render('room', {
    roomId,
    questionsUnread,
    questionsRead,
    noHasQuestions
  })
}

export const enter = (req, res) => {
  const { roomId } = req.body

  return res.redirect(`/room/${roomId}`)
}
