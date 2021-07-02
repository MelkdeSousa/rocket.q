import connection from '../database/connection'

export const index = async (req, res) => {
  const database = await connection()

  const { room: roomId, question: questionId, action } = req.params
  const { password } = req.body

  const { pass } = await database.get(
    `SELECT pass FROM rooms WHERE id = ${roomId}`
  )

  if (pass === password) {
    switch (action) {
      case 'delete':
        await database.run(`DELETE FROM questions WHERE id = ${questionId}`)
        break

      case 'check':
        await database.run(
          `UPDATE questions SET read = 1 WHERE id = ${questionId}`
        )
        break

      default:
        break
    }

    return res.redirect(`/room/${roomId}`)
  }

  return res.render('passincorrect', { roomId })
}

export const create = async (req, res) => {
  const database = await connection()

  const { question } = req.body
  const { room } = req.params

  await database.run(`
    INSERT INTO questions (
      title,
      room,
      read
    ) VALUES (
      "${question}",
      ${room},
      0
    )
  `)

  await database.close()

  return res.redirect(`/room/${room}`)
}
