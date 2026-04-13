import { Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  ADDON_MODULE_NAMES,
  CORE_MODULE_NAMES,
  type AddOnModuleName,
  type CoreModuleName,
} from './app-modules-data'
import './AppModulesPanelContent.css'

export interface AppModulesPanelContentProps {
  onNavigateAway?: () => void
}

export function AppModulesPanelContent({
  onNavigateAway,
}: AppModulesPanelContentProps) {
  return (
    <div className="app-modules-panel">
      <section
        className="app-modules-panel__section"
        aria-labelledby="app-modules-core-heading"
      >
        <h3
          id="app-modules-core-heading"
          className="app-modules-panel__section-title text-label text-secondary"
        >
          Core modules
        </h3>
        <ul className="app-modules-panel__list" role="list">
          {CORE_MODULE_NAMES.map((name) => (
            <li key={name}>
              <ModuleRow
                name={name}
                onNavigateAway={onNavigateAway}
              />
            </li>
          ))}
        </ul>
      </section>
      <section
        className="app-modules-panel__section"
        aria-labelledby="app-modules-addon-heading"
      >
        <h3
          id="app-modules-addon-heading"
          className="app-modules-panel__section-title text-label text-secondary"
        >
          Add-on modules
        </h3>
        <ul className="app-modules-panel__list" role="list">
          {ADDON_MODULE_NAMES.map((name) => (
            <li key={name}>
              <ModuleRow
                name={name}
                onNavigateAway={onNavigateAway}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function ModuleRow({
  name,
  onNavigateAway,
}: {
  name: CoreModuleName | AddOnModuleName
  onNavigateAway?: () => void
}) {
  if (name === 'Estimating') {
    return (
      <Link
        to="/estimating"
        className={clsx(
          'app-modules-panel__option-link',
          'link',
          'text-body-default',
          'text-primary'
        )}
        onClick={() => onNavigateAway?.()}
      >
        {name}
      </Link>
    )
  }

  if (name === 'Rates / Tables') {
    return (
      <Link
        to="/rates-tables"
        className={clsx(
          'app-modules-panel__option-link',
          'link',
          'text-body-default',
          'text-primary'
        )}
        onClick={() => onNavigateAway?.()}
      >
        {name}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={clsx(
        'btn',
        'btn--ghost',
        'btn--sm',
        'app-modules-panel__option',
        'text-body-default',
        'text-primary'
      )}
    >
      {name}
    </button>
  )
}
