import { Router } from 'express'
import { createPoll, getPolls } from '../controllers/poll.controller'

const router = Router()

router.get('/:userId', getPolls)

router.post('/poll/create', createPoll);

export default router