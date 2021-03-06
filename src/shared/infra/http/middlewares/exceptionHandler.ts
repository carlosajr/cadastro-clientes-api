import { Request, Response, NextFunction } from "express";
import AppError from "@shared/errors/AppError";

export default function exceptionHandler(err: Error, request: Request, response: Response, next: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}
