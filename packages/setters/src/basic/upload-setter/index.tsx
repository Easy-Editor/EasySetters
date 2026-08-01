import type { SetterProps } from '@easy-editor/core'
import { Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { getDefaultAccept, getUploadValidationError, shouldReadImageDimensions, type UploadMediaKind } from './model'
import styles from './styles.module.css'

export interface UploadValue {
  raw: {
    name: string
    size: number
    type: string
    width?: number
    height?: number
  }
  base64: string
}

export interface UploadSetterProps extends SetterProps<UploadValue | null> {
  accept?: string
  maxSize?: number
  mediaKind?: UploadMediaKind
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = readError => reject(readError)
    reader.readAsDataURL(file)
  })

const readImageDimensions = (file: File): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = loadError => {
      URL.revokeObjectURL(objectUrl)
      reject(loadError)
    }
    img.src = objectUrl
  })

const readUploadValue = async (file: File, mediaKind: UploadMediaKind): Promise<UploadValue> => {
  const base64 = await readFileAsDataUrl(file)
  const dimensions = shouldReadImageDimensions(mediaKind, file.type) ? await readImageDimensions(file) : undefined
  return {
    raw: {
      name: file.name,
      size: file.size,
      type: file.type,
      ...(dimensions ?? {}),
    },
    base64,
  }
}

const UploadSetter = (props: UploadSetterProps) => {
  const { value, initialValue, onChange, maxSize = 10 * 1024 * 1024, mediaKind = 'image' } = props
  const accept = props.accept ?? getDefaultAccept(mediaKind)
  const currentValue = value ?? initialValue
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    requestIdRef.current += 1
    const requestId = requestIdRef.current
    const file = e.target.files?.[0]
    setError('')

    if (!file) {
      return
    }

    const validationError = getUploadValidationError(file, accept, maxSize)
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      const nextValue = await readUploadValue(file, mediaKind)
      if (requestId !== requestIdRef.current) {
        return
      }
      onChange(nextValue)
    } catch (_) {
      if (requestId === requestIdRef.current) {
        setError('文件读取失败，请重试')
      }
    }
  }

  const handleClear = () => {
    requestIdRef.current += 1
    setError('')
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label className={styles.label}>
          <input
            accept={accept}
            className={styles.hiddenInput}
            onChange={handleFileChange}
            ref={inputRef}
            type='file'
          />
          <div className={styles.uploadArea}>
            <Upload className={styles.uploadIcon} />
            <span>{currentValue ? '更换文件' : '点击上传'}</span>
          </div>
        </label>

        {currentValue ? (
          <button aria-label='清除文件' className={styles.clearButton} onClick={handleClear} type='button'>
            <X className={styles.clearIcon} />
          </button>
        ) : null}
      </div>

      {currentValue ? (
        <div className={styles.fileInfo}>
          <span className={styles.fileName}>{currentValue.raw?.name}</span>
          <span className={styles.fileSize}>{(currentValue.raw?.size / 1024).toFixed(1)}KB</span>
        </div>
      ) : null}

      {error ? (
        <p className={styles.error} role='alert'>
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default UploadSetter
