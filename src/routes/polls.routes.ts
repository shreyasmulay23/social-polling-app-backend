import { Router } from 'express'
import {
  createPoll,
  deletePollHandler,
  getPolls,
  updatePoll,
} from '../controllers/poll.controller'

const router = Router()

router.get('/:userId', getPolls)

router.post('/poll/create', createPoll)

router.put('/poll/:pollId', updatePoll)

router.post('/poll/:pollId', deletePollHandler)

export default router
