import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { CreateAdminDto } from '../dtos/admins/request/create-admin.dto'
import { UpdateAdminDto } from '../dtos/admins/request/update-admin.dto'
import { AdminService } from '../services/admin.service'

export async function me(req: Request, res: Response): Promise<void> {
  if (req.user) {
    const { id } = req.user
    const result = await AdminService.findOne(id)

    res.status(200).json(result)
  }
}

export async function updateMe(req: Request, res: Response): Promise<void> {
  if (req.user) {
    const { id } = req.user
    const dto = plainToClass(UpdateAdminDto, req.body)
    await dto.isValid()

    const result = await AdminService.update(id, dto)

    res.status(200).json(result)
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const { uuid } = req.params

  const dto = plainToClass(UpdateAdminDto, req.body)
  await dto.isValid()

  const result = await AdminService.update(uuid, dto)

  res.status(200).json(result)
}

export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateAdminDto, req.body)
  await dto.isValid()

  const result = await AdminService.create(dto)

  res.status(201).json(result)
}

export async function find(req: Request, res: Response): Promise<void> {
  const result = await AdminService.find()

  res.status(200).json(result)
}

export async function deleteAdmin(req: Request, res: Response): Promise<void> {
  const { uuid } = req.params
  const result = await AdminService.deleteAdmin(uuid)

  res.status(204).json(result)
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const result = await AdminService.findOne(req.params.uuid)

  res.status(200).json(result)
}
