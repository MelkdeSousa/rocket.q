import { Router } from 'express'

import { index as indexQuestion } from './controllers/QuestionController'
import { create as createRoom, index as indexRoom } from './controllers/RoomController'

const routes = Router()

// views
routes.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
routes.get('/create-pass', (req, res) => res.render('index', { page: 'create-pass' }))
routes.get('/room/:room', indexRoom)

// controllers
routes.post('/room/:room/:question/:action', indexQuestion)
routes.post('/create-room', createRoom)

export default routes
