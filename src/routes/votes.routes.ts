import express from 'express'
import { voteHandler } from '../controllers/vote.controller'

const router = express.Router()

router.post('/vote', voteHandler)

export default router
