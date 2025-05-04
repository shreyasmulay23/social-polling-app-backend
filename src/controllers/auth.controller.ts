import { NextFunction, Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { ApiError } from '../utils/ApiError'

export const signupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body

  if (!email) {
    return next(new ApiError(400, 'Email is required', 'EMAIL_REQUIRED'))
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return next(new ApiError(400, 'Invalid email format', 'INVALID_EMAIL'))
  }

  if (!password || password.length < 6) {
    return next(new ApiError(400, 'Password must be at least 6 characters', 'WEAK_PASSWORD'))
  }
  try {
    const result = await authService.signup(email, password)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body
  try {
    const result = await authService.login(email, password)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
