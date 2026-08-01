import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { importTypescript } from './import-typescript.mjs'

const basicUrl = new URL('../packages/setters/src/basic/', import.meta.url)
const ARRAY_ITEM_PROPS_PATTERN = /itemProps\?/u
const ARRAY_INVALID_NUMBER_PATTERN = /result\.kind === 'invalid'/u
const MEDIA_KIND_PATTERN = /mediaKind\?/u
const PRIMITIVE_OPTION_PATTERN = /string \| number \| boolean/u
const REQUEST_GUARD_PATTERN = /requestId !== requestIdRef\.current/u
const REQUEST_ID_PATTERN = /requestIdRef/u
const UPLOAD_FAILURE_RESET_PATTERN = /onChange\(null\)[\s\S]*文件大小不能超过/u

test('number model distinguishes a cleared input from numeric zero', async () => {
  const { parseNumberInput } = await importTypescript(new URL('number-setter/model.ts', basicUrl))

  assert.deepEqual(parseNumberInput(''), { kind: 'empty' })
  assert.deepEqual(parseNumberInput('0'), { kind: 'value', value: 0 })
  assert.deepEqual(parseNumberInput('1.25'), { kind: 'value', value: 1.25 })
})

test('array model supports canonical and legacy setter names with length boundaries', async () => {
  const { canAddArrayItem, canRemoveArrayItem, createArrayItemValue, normalizeArrayItemSetter, parseArrayNumberInput } =
    await importTypescript(new URL('array-setter/model.ts', basicUrl))

  assert.equal(normalizeArrayItemSetter('StringSetter'), 'string')
  assert.equal(normalizeArrayItemSetter('NumberSetter'), 'number')
  assert.equal(normalizeArrayItemSetter('ColorSetter'), 'color')
  assert.equal(createArrayItemValue('NumberSetter'), 0)
  assert.equal(createArrayItemValue('ColorSetter'), '#000000')
  assert.equal(canAddArrayItem(2, 2), false)
  assert.equal(canRemoveArrayItem(2, 2), false)
  assert.deepEqual(parseArrayNumberInput(''), { kind: 'invalid' })
  assert.deepEqual(parseArrayNumberInput('not-a-number'), { kind: 'invalid' })
  assert.deepEqual(parseArrayNumberInput('Infinity'), { kind: 'invalid' })
  assert.deepEqual(parseArrayNumberInput('12.5'), { kind: 'value', value: 12.5 })
})

test('upload model uses media-aware accepts and image decoding', async () => {
  const { getDefaultAccept, getUploadValidationError, shouldReadImageDimensions } = await importTypescript(
    new URL('upload-setter/model.ts', basicUrl),
  )

  assert.equal(getDefaultAccept('audio'), 'audio/*')
  assert.equal(getDefaultAccept('video'), 'video/*')
  assert.equal(shouldReadImageDimensions('image', 'image/png'), true)
  assert.equal(shouldReadImageDimensions('audio', 'audio/mpeg'), false)
  assert.equal(shouldReadImageDimensions('video', 'video/mp4'), false)
  assert.equal(shouldReadImageDimensions('file', 'image/png'), false)
  assert.equal(
    getUploadValidationError({ name: 'clip.mp4', size: 2 * 1024 * 1024, type: 'video/mp4' }, 'video/*', 1024 * 1024),
    '文件大小不能超过 1MB',
  )
  assert.equal(
    getUploadValidationError({ name: 'clip.mp4', size: 1, type: 'video/mp4' }, 'audio/*', 10),
    '仅支持 audio/* 格式文件',
  )
  assert.equal(getUploadValidationError({ name: 'clip.mp4', size: 1, type: 'video/mp4' }, 'video/*', 10), null)
})

test('component props expose native constraints and primitive option values', async () => {
  const [numberSource, stringSource, selectSource, segmentedSource, arraySource, uploadSource] = await Promise.all(
    ['number-setter', 'string-setter', 'select-setter', 'segmented-setter', 'array-setter', 'upload-setter'].map(
      directory => readFile(new URL(`${directory}/index.tsx`, basicUrl), 'utf8'),
    ),
  )

  for (const constraint of ['min?: number', 'max?: number', 'step?: number']) {
    assert.match(numberSource, new RegExp(constraint.replace(/[?]/gu, '\\?')))
  }
  for (const constraint of ['minLength?: number', 'maxLength?: number', 'pattern?: string', 'inputType?']) {
    assert.match(stringSource, new RegExp(constraint.replace(/[?]/gu, '\\?')))
  }
  assert.match(selectSource, PRIMITIVE_OPTION_PATTERN)
  assert.match(segmentedSource, PRIMITIVE_OPTION_PATTERN)
  assert.match(arraySource, ARRAY_ITEM_PROPS_PATTERN)
  assert.match(uploadSource, MEDIA_KIND_PATTERN)
  assert.doesNotMatch(uploadSource, UPLOAD_FAILURE_RESET_PATTERN)
  assert.match(uploadSource, REQUEST_ID_PATTERN)
  assert.match(uploadSource, REQUEST_GUARD_PATTERN)
  assert.match(arraySource, ARRAY_INVALID_NUMBER_PATTERN)
})
