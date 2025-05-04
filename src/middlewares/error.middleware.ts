// middlewares/errorMiddleware.ts

import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const message = err instanceof ApiError ? err.message : 'Internal Server Error'
  const code = err instanceof ApiError && err.code ? err.code : 'INTERNAL_ERROR'

  // Log full error in console (for server-side debugging)
  console.error('🔴 Error:', err.stack || err)

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  })
}
