import { Router } from 'express'
import { createPoll, getPolls, updatePoll } from '../controllers/poll.controller'

const router = Router()

router.get('/:userId', getPolls)

router.post('/poll/create', createPoll);

router.put('/poll/:pollId', updatePoll);

export default router