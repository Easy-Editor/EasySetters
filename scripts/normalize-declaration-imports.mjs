import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const trailingSlashPattern = /\/$/
const cssImportPattern = /^import\s+['"][^'"]+\.css['"];?\s*\n?/gm
const moduleSpecifierPattern = /(from\s+|import\s*\(\s*)(['"])([^'"]+)\2/g

const collectDeclarationFiles = directory =>
  readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) {
      return collectDeclarationFiles(entryPath)
    }
    return entry.isFile() && entry.name.endsWith('.d.ts') ? [entryPath] : []
  })

const normalizeSpecifier = (specifier, declarationPath) => {
  if (specifier !== '.' && !specifier.startsWith('./') && !specifier.startsWith('../')) {
    return specifier
  }
  if (extname(specifier)) {
    return specifier
  }

  const target = resolve(dirname(declarationPath), specifier)
  if (existsSync(`${target}.d.ts`)) {
    return `${specifier}.js`
  }
  if (existsSync(join(target, 'index.d.ts'))) {
    const prefix = specifier === '.' ? './' : `${specifier.replace(trailingSlashPattern, '')}/`
    return `${prefix}index.js`
  }
  throw new Error(`Cannot resolve declaration import ${specifier} from ${declarationPath}`)
}

for (const declarationPath of collectDeclarationFiles(distDir)) {
  const source = readFileSync(declarationPath, 'utf8')
  const normalized = source
    .replace(cssImportPattern, '')
    .replace(
      moduleSpecifierPattern,
      (_match, prefix, quote, specifier) =>
        `${prefix}${quote}${normalizeSpecifier(specifier, declarationPath)}${quote}`,
    )
  writeFileSync(declarationPath, normalized)
}
