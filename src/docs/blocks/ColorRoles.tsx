import { COLOR_ROLES } from './tokenData';

function Swatch({ role, theme, alias }: { role: string; theme: 'light' | 'dark'; alias: string }) {
  return (
    <div data-theme={theme} className="flex items-center gap-2 rounded-lg bg-surface p-2">
      <span
        className="size-8 shrink-0 rounded-md border border-border"
        style={{ background: `var(--ds-color-${role})` }}
        aria-hidden="true"
      />
      <span className="font-mono text-fg-muted text-xs">{alias}</span>
    </div>
  );
}

/** Every semantic color role, rendered from the generated CSS in both themes side by side. */
export function ColorRoles() {
  return (
    <div className="not-prose overflow-x-auto">
      <table className="w-full border-collapse text-start text-sm">
        <thead>
          <tr className="border-border border-b text-fg-muted">
            <th className="py-2 pe-4 text-start font-medium">Role</th>
            <th className="py-2 pe-4 text-start font-medium">Light</th>
            <th className="py-2 pe-4 text-start font-medium">Dark</th>
            <th className="py-2 text-start font-medium">Use for</th>
          </tr>
        </thead>
        <tbody>
          {COLOR_ROLES.map((role) => (
            <tr key={role.name} className="border-border border-b align-middle">
              <td className="py-2 pe-4 font-mono text-fg text-xs">{role.name}</td>
              <td className="py-2 pe-4">
                <Swatch role={role.name} theme="light" alias={role.light} />
              </td>
              <td className="py-2 pe-4">
                <Swatch role={role.name} theme="dark" alias={role.dark} />
              </td>
              <td className="py-2 text-fg-muted">{role.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
