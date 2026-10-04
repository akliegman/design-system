import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const MODES_EXTENSION = 'com.akliegman.modes';

export type TokenType = 'color' | 'dimension' | 'fontFamily' | 'typography' | 'duration' | 'cubicBezier' | 'shadow';

export interface ColorValue {
  colorSpace: 'oklch';
  components: [l: number, c: number, h: number];
  alpha?: number;
}

export interface DimensionValue {
  value: number;
  unit: string;
}

export interface Token {
  /** Dot path inside its file, e.g. `color.neutral.25`. */
  path: string;
  layer: 'primitive' | 'semantic';
  type: TokenType;
  value: unknown;
  /** Present on semantic colors: the value used when the dark theme is active. */
  dark?: unknown;
  description?: string;
}

interface RawNode {
  $type?: TokenType;
  $value?: unknown;
  $description?: string;
  $extensions?: Record<string, { dark?: unknown } | undefined>;
  [key: string]: unknown;
}

const tokensDir = fileURLToPath(new URL('../../tokens/', import.meta.url));

function readJson(file: string): RawNode {
  return JSON.parse(readFileSync(`${tokensDir}${file}`, 'utf8')) as RawNode;
}

function flatten(
  node: RawNode,
  layer: Token['layer'],
  path: string[],
  inheritedType: TokenType | undefined,
  out: Token[],
) {
  const type = node.$type ?? inheritedType;

  if ('$value' in node) {
    if (!type) throw new Error(`Token ${path.join('.')} has no $type`);
    const dark = node.$extensions?.[MODES_EXTENSION]?.dark;
    out.push({
      path: path.join('.'),
      layer,
      type,
      value: node.$value,
      ...(dark === undefined ? {} : { dark }),
      ...(node.$description ? { description: node.$description } : {}),
    });
    return;
  }

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    flatten(child as RawNode, layer, [...path, key], type, out);
  }
}

export function loadTokens(): Token[] {
  const tokens: Token[] = [];
  flatten(readJson('primitives.json'), 'primitive', [], undefined, tokens);
  flatten(readJson('semantic.json'), 'semantic', [], undefined, tokens);

  const paths = new Set(tokens.map((token) => token.path));
  const problems: string[] = [];

  for (const token of tokens) {
    if (token.layer === 'semantic' && token.type === 'color' && token.dark === undefined) {
      problems.push(`${token.path} has no dark value (expected $extensions["${MODES_EXTENSION}"].dark)`);
    }
    if (token.layer === 'primitive' && referencesIn(token.value).length > 0) {
      problems.push(`${token.path} is a primitive but references another token`);
    }
    for (const reference of [...referencesIn(token.value), ...referencesIn(token.dark)]) {
      if (!paths.has(reference)) problems.push(`${token.path} references missing token {${reference}}`);
    }
  }

  if (problems.length > 0) throw new Error(`Invalid tokens:\n  ${problems.join('\n  ')}`);
  return tokens;
}

export function referenceOf(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const match = /^\{([^}]+)\}$/.exec(value);
  return match?.[1] ?? null;
}

function referencesIn(value: unknown): string[] {
  if (value === undefined || value === null) return [];
  const direct = referenceOf(value);
  if (direct) return [direct];
  if (Array.isArray(value)) return value.flatMap(referencesIn);
  if (typeof value === 'object') return Object.values(value).flatMap(referencesIn);
  return [];
}

/** Follows aliases until it reaches a literal value. */
export function resolve(tokens: Token[], value: unknown, mode: 'light' | 'dark' = 'light'): unknown {
  const reference = referenceOf(value);
  if (!reference) return value;
  const target = tokens.find((token) => token.path === reference);
  if (!target) throw new Error(`Unresolvable reference {${reference}}`);
  return resolve(tokens, mode === 'dark' && target.dark !== undefined ? target.dark : target.value, mode);
}
