import { cn } from './cn';

describe('cn', () => {
  it('lets a later class override an earlier one in the same group', () => {
    expect(cn('bg-surface text-fg', 'bg-accent')).toBe('text-fg bg-accent');
  });

  it('treats semantic text colors and type sizes as separate groups', () => {
    expect(cn('text-base text-fg-muted', 'text-fg')).toBe('text-base text-fg');
    expect(cn('text-base text-fg', 'text-lg')).toBe('text-fg text-lg');
  });

  it('merges elevation tokens as shadows', () => {
    expect(cn('shadow-raised', 'shadow-overlay')).toBe('shadow-overlay');
  });
});
