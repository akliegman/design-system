import { DURATIONS, EASINGS, ELEVATIONS, RADII, TYPE_SCALE } from './tokenData';

const SPACING_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];

export function TypeScale() {
  return (
    <div className="not-prose flex flex-col divide-y divide-border">
      {[...TYPE_SCALE].reverse().map((step) => (
        <div key={step.name} className="flex items-baseline gap-6 py-3">
          <code className="w-28 shrink-0 font-mono text-fg-muted text-xs">
            text-{step.name}
            <br />
            {step.fontSize.value * 16}px / {Math.round(step.fontSize.value * 16 * step.lineHeight)}px
          </code>
          <span
            className="truncate text-fg"
            style={{
              fontSize: `var(--ds-type-${step.name}-size)`,
              lineHeight: `var(--ds-type-${step.name}-line-height)`,
              letterSpacing: `var(--ds-type-${step.name}-tracking)`,
            }}
          >
            Invoices paid this quarter
          </span>
        </div>
      ))}
    </div>
  );
}

export function SpacingScale() {
  return (
    <div className="not-prose flex flex-col gap-2">
      {SPACING_STEPS.map((step) => (
        <div key={step} className="flex items-center gap-4">
          <code className="w-28 shrink-0 font-mono text-fg-muted text-xs">
            {step} = {step * 4}px
          </code>
          <span className="h-3 rounded-sm bg-accent" style={{ width: `calc(var(--ds-spacing-base) * ${step})` }} />
        </div>
      ))}
    </div>
  );
}

export function RadiusScale() {
  return (
    <div className="not-prose flex flex-wrap gap-6">
      {RADII.map((radius) => (
        <div key={radius.name} className="flex flex-col items-center gap-2">
          <span
            className="size-16 border border-border-strong bg-surface-raised"
            style={{ borderRadius: `var(--ds-radius-${radius.name})` }}
          />
          <code className="font-mono text-fg-muted text-xs">
            rounded-{radius.name}
            {radius.name === 'full' ? '' : ` ${radius.value}px`}
          </code>
        </div>
      ))}
    </div>
  );
}

export function ElevationScale() {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-theme={theme} className="flex gap-6 rounded-xl bg-surface p-6">
          {ELEVATIONS.map((elevation) => (
            <div
              key={elevation.name}
              className="flex h-20 flex-1 items-end rounded-lg border border-border bg-surface-raised p-3"
              style={{ boxShadow: `var(--ds-elevation-${elevation.name})` }}
            >
              <code className="font-mono text-fg-muted text-xs">shadow-{elevation.name}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function MotionTokens() {
  return (
    <div className="not-prose grid gap-6 sm:grid-cols-2">
      <dl className="flex flex-col gap-3">
        {DURATIONS.map((duration) => (
          <div key={duration.name}>
            <dt className="font-mono text-fg text-xs">
              --ds-duration-{duration.name}: {duration.value}ms
            </dt>
            <dd className="text-fg-muted text-sm">{duration.description}</dd>
          </div>
        ))}
      </dl>
      <dl className="flex flex-col gap-3">
        {EASINGS.map((easing) => (
          <div key={easing.name}>
            <dt className="font-mono text-fg text-xs">
              ease-{easing.name}: cubic-bezier({easing.value.join(', ')})
            </dt>
            <dd className="text-fg-muted text-sm">{easing.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
