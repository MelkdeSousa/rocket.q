import { Router } from 'express'

import {
  index as indexQuestion,
  create as createQuestion
} from './controllers/QuestionController'
import {
  create as createRoom,
  index as indexRoom,
  enter as enterRoom
} from './controllers/RoomController'

const routes = Router()

// views
routes.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
routes.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)

// controllers
// questions
routes.post('/question/create/:room', createQuestion)
routes.post('/room/:room/:question/:action', indexQuestion)

// rooms
routes.post('/create-room', createRoom)
routes.get('/room/:room', indexRoom)
routes.post('/room', enterRoom)

export default routes
