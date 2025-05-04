import { NextFunction, Request, Response } from 'express'
import { submitVote } from '../services/votes.service'

export const voteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pollId, selectedOption } = req.body
  try {
    const result = await submitVote(pollId, selectedOption, userId)
    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
