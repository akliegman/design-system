export type ColorRole =
  | 'surface'
  | 'surface-raised'
  | 'surface-sunken'
  | 'surface-hover'
  | 'surface-pressed'
  | 'surface-inverse'
  | 'fg'
  | 'fg-muted'
  | 'fg-inverse'
  | 'fg-on-accent'
  | 'fg-on-danger'
  | 'border'
  | 'border-strong'
  | 'accent'
  | 'accent-hover'
  | 'accent-subtle'
  | 'accent-text'
  | 'danger'
  | 'danger-hover'
  | 'danger-subtle'
  | 'danger-text'
  | 'success'
  | 'success-subtle'
  | 'success-text'
  | 'warning'
  | 'warning-subtle'
  | 'warning-text'
  | 'focus-ring';

export interface ContrastPair {
  fg: ColorRole;
  bg: ColorRole;
  /** 4.5 for text, 3 for UI boundaries, focus indicators and meaningful icons (WCAG 1.4.3, 1.4.11). */
  min: 4.5 | 3;
  usedBy: string;
}

/** Every foreground and background combination the components render. The contrast test checks each one in both themes. */
export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  { fg: 'fg', bg: 'surface', min: 4.5, usedBy: 'Body text, Heading, Text' },
  { fg: 'fg', bg: 'surface-raised', min: 4.5, usedBy: 'Card, Dialog, TextField, Select' },
  { fg: 'fg', bg: 'surface-sunken', min: 4.5, usedBy: 'Tabs list' },
  { fg: 'fg', bg: 'surface-hover', min: 4.5, usedBy: 'Button hover, Select option hover, Badge tone="neutral"' },
  { fg: 'fg', bg: 'surface-pressed', min: 4.5, usedBy: 'Pressed Button, selected ToggleButton' },
  { fg: 'fg-muted', bg: 'surface', min: 4.5, usedBy: 'Text tone="muted", Breadcrumbs' },
  { fg: 'fg-muted', bg: 'surface-raised', min: 4.5, usedBy: 'Field descriptions, placeholders, Card footer' },
  { fg: 'fg-muted', bg: 'surface-sunken', min: 4.5, usedBy: 'Inactive Tabs' },
  { fg: 'fg-muted', bg: 'surface-hover', min: 4.5, usedBy: 'Hovered inactive Tab' },
  { fg: 'fg-inverse', bg: 'surface-inverse', min: 4.5, usedBy: 'Tooltip' },
  { fg: 'fg-on-accent', bg: 'accent', min: 4.5, usedBy: 'Primary Button, checked Checkbox' },
  { fg: 'fg-on-accent', bg: 'accent-hover', min: 4.5, usedBy: 'Primary Button hover' },
  { fg: 'fg-on-danger', bg: 'danger', min: 4.5, usedBy: 'Danger Button' },
  { fg: 'fg-on-danger', bg: 'danger-hover', min: 4.5, usedBy: 'Danger Button hover' },
  { fg: 'accent-text', bg: 'surface', min: 4.5, usedBy: 'Link' },
  { fg: 'accent-text', bg: 'surface-raised', min: 4.5, usedBy: 'Link inside Card' },
  { fg: 'accent-text', bg: 'accent-subtle', min: 4.5, usedBy: 'Badge tone="accent", selected ToggleButton' },
  { fg: 'danger-text', bg: 'surface', min: 4.5, usedBy: 'Field error message' },
  { fg: 'danger-text', bg: 'surface-raised', min: 4.5, usedBy: 'Field error text and invalid field boundary' },
  { fg: 'danger-text', bg: 'danger-subtle', min: 4.5, usedBy: 'Badge tone="danger"' },
  { fg: 'success-text', bg: 'success-subtle', min: 4.5, usedBy: 'Badge tone="success"' },
  { fg: 'warning-text', bg: 'warning-subtle', min: 4.5, usedBy: 'Badge tone="warning"' },
  { fg: 'success-text', bg: 'surface', min: 4.5, usedBy: 'Text tone="success"' },
  { fg: 'success-text', bg: 'surface-raised', min: 4.5, usedBy: 'Text tone="success" inside Card or Dialog' },
  { fg: 'warning-text', bg: 'surface', min: 4.5, usedBy: 'Text tone="warning"' },
  { fg: 'warning-text', bg: 'surface-raised', min: 4.5, usedBy: 'Text tone="warning" inside Card or Dialog' },
  { fg: 'border-strong', bg: 'surface', min: 3, usedBy: 'Checkbox, Radio and Switch boundaries' },
  { fg: 'border-strong', bg: 'surface-raised', min: 3, usedBy: 'TextField and Select boundaries' },
  { fg: 'accent', bg: 'surface', min: 3, usedBy: 'Checked Checkbox, selected Radio, on Switch' },
  { fg: 'accent', bg: 'surface-raised', min: 3, usedBy: 'Controls inside Card or Dialog' },
  { fg: 'success', bg: 'surface', min: 3, usedBy: 'Status icons' },
  { fg: 'warning', bg: 'surface', min: 3, usedBy: 'Status icons' },
  { fg: 'accent-text', bg: 'surface-sunken', min: 3, usedBy: 'Selected Tab indicator' },
  { fg: 'focus-ring', bg: 'surface', min: 3, usedBy: 'Focus ring on the page' },
  { fg: 'focus-ring', bg: 'surface-raised', min: 3, usedBy: 'Focus ring inside Card or Dialog' },
  { fg: 'focus-ring', bg: 'surface-sunken', min: 3, usedBy: 'Focus ring inside Tabs list' },
];
