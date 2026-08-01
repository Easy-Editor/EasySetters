export type ArrayItemSetter = 'string' | 'number' | 'StringSetter' | 'NumberSetter' | 'ColorSetter'
export type ArrayItemKind = 'string' | 'number' | 'color'
export type ParsedArrayNumberInput = { kind: 'invalid' } | { kind: 'value'; value: number }

export const normalizeArrayItemSetter = (setter: ArrayItemSetter): ArrayItemKind => {
  if (setter === 'number' || setter === 'NumberSetter') {
    return 'number'
  }
  if (setter === 'ColorSetter') {
    return 'color'
  }
  return 'string'
}

export const createArrayItemValue = (setter: ArrayItemSetter): string | number => {
  const kind = normalizeArrayItemSetter(setter)
  if (kind === 'number') {
    return 0
  }
  if (kind === 'color') {
    return '#000000'
  }
  return ''
}

export const canAddArrayItem = (length: number, maxItems?: number): boolean =>
  maxItems === undefined || length < maxItems

export const canRemoveArrayItem = (length: number, minItems = 0): boolean => length > minItems

export const parseArrayNumberInput = (input: string): ParsedArrayNumberInput => {
  if (input.trim() === '') {
    return { kind: 'invalid' }
  }

  const value = Number(input)
  return Number.isFinite(value) ? { kind: 'value', value } : { kind: 'invalid' }
}
