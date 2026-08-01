export type ParsedNumberInput = { kind: 'empty' } | { kind: 'value'; value: number }

export const parseNumberInput = (input: string): ParsedNumberInput => {
  if (input.trim() === '') {
    return { kind: 'empty' }
  }

  return { kind: 'value', value: Number(input) }
}
