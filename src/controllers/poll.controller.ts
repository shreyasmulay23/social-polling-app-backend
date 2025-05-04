import { NextFunction, Request, Response } from 'express'
import {
  createPollWithOptions,
  getAllPollsByUserId,
} from '../services/polls.service'

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

export const createPoll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, question, options } = req.body;
    const pollId = await createPollWithOptions(userId, question, options);
    res.status(201).json({ pollId });
  } catch (error) {
    next(error);
  }
};
