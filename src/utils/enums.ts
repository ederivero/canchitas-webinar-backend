export enum PrismaErrorEnum {
  NOT_FOUND = 'P2025', // Record not found
  DUPLICATED = 'P2002', // Unique constraint fails
  FOREIGN_KEY_CONSTRAINT = 'P2003', // Foreign key constraint fails
}

export enum ContentTypeEnum {
  'PNG' = 'image/png',
  'JPG' = 'image/jpg',
  'JPEG' = 'image/jpeg',
}

export enum FileExtensionEnum {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
}

export enum ParentEnum {
  PLACE = 'PLACE',
}

export enum AttachmentDirectoryEnum {
  PLACE = 'attachments/places/{uuid}',
}
