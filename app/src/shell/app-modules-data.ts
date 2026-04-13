/** Labels aligned with dashboard Core / Add-on module cards. */

export const CORE_MODULE_NAMES = [
  'Estimating',
  'Rates / Tables',
  'Reporting',
  'Libraries',
] as const

export const ADDON_MODULE_NAMES = [
  'BOE Authoring',
  'Materials',
  'Cost Volumes',
  'Program Mgmt',
  'Cashflow',
] as const

export type CoreModuleName = (typeof CORE_MODULE_NAMES)[number]
export type AddOnModuleName = (typeof ADDON_MODULE_NAMES)[number]
