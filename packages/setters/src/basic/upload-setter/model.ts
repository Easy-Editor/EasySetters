export type UploadMediaKind = 'image' | 'video' | 'audio' | 'file'

const DEFAULT_ACCEPTS: Record<UploadMediaKind, string> = {
  audio: 'audio/*',
  file: '',
  image: 'image/*',
  video: 'video/*',
}

export const getDefaultAccept = (mediaKind: UploadMediaKind): string => DEFAULT_ACCEPTS[mediaKind]

export const shouldReadImageDimensions = (mediaKind: UploadMediaKind, mimeType: string): boolean =>
  mediaKind === 'image' && mimeType.startsWith('image/')

export const matchesAccept = (file: Pick<File, 'name' | 'type'>, accept: string): boolean => {
  if (!accept.trim()) {
    return true
  }

  const lowerName = file.name.toLowerCase()
  const lowerType = file.type.toLowerCase()
  return accept
    .split(',')
    .map(rule => rule.trim().toLowerCase())
    .filter(Boolean)
    .some(rule => {
      if (rule.startsWith('.')) {
        return lowerName.endsWith(rule)
      }
      if (rule.endsWith('/*')) {
        return lowerType.startsWith(rule.slice(0, -1))
      }
      return lowerType === rule
    })
}

export const getUploadValidationError = (
  file: Pick<File, 'name' | 'size' | 'type'>,
  accept: string,
  maxSize: number,
): string | null => {
  if (!matchesAccept(file, accept)) {
    return `仅支持 ${accept} 格式文件`
  }
  if (file.size > maxSize) {
    return `文件大小不能超过 ${maxSize / 1024 / 1024}MB`
  }
  return null
}
