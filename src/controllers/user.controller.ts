import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { RegisterDto } from '../dtos/user/request/register.dto'
import { UserService } from '../services/user.service'

export async function registerUser(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(RegisterDto, req.body)
  await dto.isValid()

  const data = await UserService.registerUser(dto)
  res.status(201).json(data)
}
