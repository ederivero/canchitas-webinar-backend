import {
  ContentTypeEnum,
  FileExtensionEnum,
  ParentEnum,
} from '../../../utils/enums'

export class CreateAttachmentDto {
  readonly placeId: string
  readonly contentType: ContentTypeEnum
  readonly ext: FileExtensionEnum
  readonly parentType: ParentEnum
  readonly filename: string
}
