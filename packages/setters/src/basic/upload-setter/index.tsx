import type { SetterProps } from '@easy-editor/core'
import { Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from './styles.module.css'

export interface UploadValue {
  raw: {
    name: string
    size: number
    type: string
    width: number
    height: number
  }
  base64: string
}

export interface UploadSetterProps extends SetterProps<UploadValue | null> {
  accept?: string
  maxSize?: number
}

const UploadSetter = (props: UploadSetterProps) => {
  const { value, onChange, accept = '.jpg,.jpeg,.png,.gif', maxSize = 10 * 1024 * 1024 } = props
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError('')

    if (!file) {
      onChange(null)
      return
    }

    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!accept.includes(ext)) {
      setError(`仅支持 ${accept} 格式文件`)
      onChange(null)
      return
    }

    if (file.size > maxSize) {
      setError(`文件大小不能超过 ${maxSize / 1024 / 1024}MB`)
      onChange(null)
      return
    }

    try {
      const [base64, dimensions] = await Promise.all([
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = err => reject(err)
          reader.readAsDataURL(file)
        }),
        new Promise<{ width: number; height: number }>((resolve, reject) => {
          const img = new Image()
          img.onload = () =>
            resolve({
              width: img.naturalWidth,
              height: img.naturalHeight,
            })
          img.onerror = reject
          img.src = URL.createObjectURL(file)
        }),
      ])

      onChange({
        raw: {
          name: file.name,
          size: file.size,
          type: file.type,
          width: dimensions.width,
          height: dimensions.height,
        },
        base64,
      })
    } catch (_) {
      setError('文件读取失败，请重试')
      onChange(null)
    }
  }

  const handleClear = () => {
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
            <span>{value ? '更换文件' : '点击上传'}</span>
          </div>
        </label>

        {value ? (
          <button aria-label='清除文件' className={styles.clearButton} onClick={handleClear} type='button'>
            <X className={styles.clearIcon} />
          </button>
        ) : null}
      </div>

      {value ? (
        <div className={styles.fileInfo}>
          <span className={styles.fileName}>{value.raw?.name}</span>
          <span className={styles.fileSize}>{(value.raw?.size / 1024).toFixed(1)}KB</span>
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
