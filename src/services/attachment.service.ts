import { nanoid } from 'nanoid'
import { plainToClass } from 'class-transformer'
import { NotFound, UnprocessableEntity } from 'http-errors'
import { s3 } from '../s3'
import { prisma } from '../prisma'
import { CreateAttachmentDto } from '../dtos/attachments/request/create-attachment.dto'
import { AttachmentDto } from '../dtos/attachments/respose/attachment.dto'
import { AttachmentDirectoryEnum } from '../utils/enums'

export class AttachmentService {
  static async create(input: CreateAttachmentDto) {
    const path = AttachmentDirectoryEnum[input.parentType].replace(
      '{uuid}',
      input.placeId,
    )

    const attachment = await prisma.attachment.create({
      data: {
        contentType: input.contentType,
        key: `${nanoid()}-${input.filename}`,
        ext: input.ext,
        path,
        placeId: input.placeId,
      },
    })

    const signedUrl = s3.getSignedUrl('putObject', {
      Key: `${path}/${attachment.key}.${attachment.ext}`,
      ContentType: attachment.contentType,
      Bucket: process.env.AWS_BUCKET,
      Expires: +(process.env.AWS_PRESIGNED_EXPIRES_IN ?? 0),
    })

    return plainToClass(AttachmentDto, { signedUrl, ...attachment })
  }

  static getSignedUrl(path: string) {
    return s3.getSignedUrl('getObject', {
      Key: path,
      Bucket: process.env.AWS_BUCKET,
      Expires: +(process.env.AWS_PRESIGNED_EXPIRES_IN ?? 0),
    })
  }

  static async delete(placeId: string): Promise<void> {
    const attachment = await prisma.attachment.findUnique({
      where: { placeId },
      rejectOnNotFound: false,
    })

    if (!attachment) {
      throw new NotFound('The task does not have an attachment')
    }

    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET ?? '',
        Key: `${attachment.path}/${attachment.key}.${attachment.ext}`,
      },
      (err) => {
        if (err) {
          throw new UnprocessableEntity(err?.message)
        }
      },
    )

    try {
      await prisma.attachment.delete({ where: { placeId } })
    } catch (error) {
      throw new NotFound("Couldn't find Attachment")
    }
  }
}
