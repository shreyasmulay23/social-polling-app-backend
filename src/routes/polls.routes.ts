import { Router } from 'express'
import { getPolls } from '../controllers/poll.controller'

const router = Router()

router.get('/:userId', getPolls)

export default router