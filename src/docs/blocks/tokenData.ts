import primitives from '../../../tokens/primitives.json';
import semantic from '../../../tokens/semantic.json';

interface SemanticColorToken {
  $value: unknown;
  $description: string;
  $extensions: { 'com.akliegman.modes': { dark: unknown } };
}

export interface ColorRoleInfo {
  name: string;
  description: string;
  light: string;
  dark: string;
}

const aliasLabel = (value: unknown) =>
  typeof value === 'string' ? value.replace(/^\{color\.|\}$/g, '') : 'literal with alpha';

export const COLOR_ROLES: ColorRoleInfo[] = Object.entries(semantic.color as Record<string, unknown>)
  .filter(([name]) => !name.startsWith('$'))
  .map(([name, token]) => {
    const { $value, $description, $extensions } = token as SemanticColorToken;
    return {
      name,
      description: $description,
      light: aliasLabel($value),
      dark: aliasLabel($extensions['com.akliegman.modes'].dark),
    };
  });

interface Dimension {
  value: number;
  unit: string;
}

const entries = <T>(group: Record<string, unknown>) =>
  Object.entries(group).filter(([key]) => !key.startsWith('$')) as [string, { $value: T; $description?: string }][];

export const TYPE_SCALE = entries<{ fontSize: Dimension; lineHeight: number; letterSpacing: Dimension }>(
  primitives.type,
).map(([name, token]) => ({ name, ...token.$value }));

export const RADII = entries<Dimension>(primitives.radius).map(([name, token]) => ({ name, ...token.$value }));

export const DURATIONS = entries<Dimension>(primitives.duration).map(([name, token]) => ({
  name,
  ...token.$value,
  description: token.$description ?? '',
}));

export const EASINGS = entries<number[]>(primitives.ease).map(([name, token]) => ({
  name,
  value: token.$value,
  description: token.$description ?? '',
}));

export const ELEVATIONS = entries<unknown>(semantic.elevation).map(([name, token]) => ({
  name,
  description: token.$description ?? '',
}));
