import { Request, Response, NextFunction } from 'express'
import { Unauthorized } from 'http-errors'
import { verify } from 'jsonwebtoken'
import { prisma } from '../prisma'

export async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    throw new Unauthorized('This request needs credentials ')
  }

  const token = req.headers.authorization.split(' ')[1]

  const payload = verify(token, String(process.env.JWT_SECRET_KEY))
  if (typeof payload !== 'string') {
    const auth = await prisma.token.findFirst({
      where: { jti: payload.jti },
      include: {
        user: { select: { id: true, email: true } },
        admin: { select: { id: true, email: true } },
      },
    })
    if (auth.user) {
      req.user = { ...auth.user, type: 'user' }
    }
    if (auth.admin) {
      req.user = { ...auth.admin, type: 'admin' }
    }
    next()
  }
}

export async function adminValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.type !== 'admin') {
    throw new Unauthorized('This request is only for admins')
  }
  next()
}

export async function userValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.type !== 'user') {
    throw new Unauthorized('This request is only for users')
  }
  next()
}
