import { NextFunction, Request, Response } from 'express'
import { getAllPollsByUserId } from '../services/polls.service'

export const getPolls = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId

    const polls = await getAllPollsByUserId(userId)

    res.status(200).json(polls)
  } catch (error) {
    console.error('Poll fetch error:', error)
    next(error)
  }
}
