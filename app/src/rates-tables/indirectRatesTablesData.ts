export type IndirectRateTableMeta = {
  id: string
  name: string
  subtitle: string
  fyRange: string
  categoriesLabel: string
  lastModified: string
  /** Breadcrumb segment after "Core ·" (matches list context or mock). */
  scopeSegment: 'Direct Rates' | 'Indirect Rates'
  /** Shown after theme-colored breadcrumb segment. */
  globalLine: string
}

export const INDIRECT_RATE_TABLES: IndirectRateTableMeta[] = [
  {
    id: '1',
    name: 'Corporate Standard Labor Rates',
    subtitle: 'Primary direct labor rate table',
    fyRange: 'FY2024 – FY2026',
    categoriesLabel: '14 categories',
    lastModified: 'Apr 2, 2026',
    scopeSegment: 'Direct Rates',
    globalLine: 'Global · used on 8 proposals',
  },
  {
    id: '2',
    name: 'Division B Labor Rates',
    subtitle: 'Alternate rate set for Div. B programs',
    fyRange: 'FY2023 – FY2025',
    categoriesLabel: '12 categories',
    lastModified: 'Mar 18, 2026',
    scopeSegment: 'Indirect Rates',
    globalLine: 'Global · used on 5 proposals',
  },
  {
    id: '3',
    name: 'IDIQ Ceiling Rates',
    subtitle: 'Government contract ceiling rate set',
    fyRange: 'FY2024 – FY2027',
    categoriesLabel: '8 categories',
    lastModified: 'Feb 4, 2026',
    scopeSegment: 'Indirect Rates',
    globalLine: 'Global · used on 3 proposals',
  },
  {
    id: '4',
    name: 'SCA Wage Determination Rates',
    subtitle: 'Service Contract Act compliance rates',
    fyRange: 'FY2024 – FY2026',
    categoriesLabel: '22 categories',
    lastModified: 'Jan 22, 2026',
    scopeSegment: 'Indirect Rates',
    globalLine: 'Global · used on 11 proposals',
  },
  {
    id: '5',
    name: 'Proposed Forward Pricing Rates',
    subtitle: 'FPRA submission rates',
    fyRange: 'FY2025 – FY2028',
    categoriesLabel: '10 categories',
    lastModified: 'Dec 8, 2025',
    scopeSegment: 'Indirect Rates',
    globalLine: 'Global · used on 2 proposals',
  },
]

export function getIndirectRateTable(
  id: string | undefined
): IndirectRateTableMeta | undefined {
  if (id == null || id === '') return undefined
  return INDIRECT_RATE_TABLES.find((t) => t.id === id)
}

export type LaborRateCategoryRow = {
  id: string
  category: string
  title: string
  grade: string
  baseSalary: string
  fringeRate: string
  fringeDollar: string
  overheadRate: string
  overheadDollar: string
  gaRate: string
  loadedRateHr: string
}

/** Sample grid rows (structure matches direct labor rate editor). */
export const LABOR_RATE_CATEGORY_ROWS: LaborRateCategoryRow[] = [
  {
    id: 'r1',
    category: 'PROG-MGR',
    title: 'Program Manager',
    grade: 'L6',
    baseSalary: '$185,000',
    fringeRate: '34.2%',
    fringeDollar: '$63,270',
    overheadRate: '42.8%',
    overheadDollar: '$79,180',
    gaRate: '12.4%',
    loadedRateHr: '$265.00',
  },
  {
    id: 'r2',
    category: 'SYS-ENG',
    title: 'Systems Engineer',
    grade: 'L5',
    baseSalary: '$162,400',
    fringeRate: '33.8%',
    fringeDollar: '$54,892',
    overheadRate: '41.2%',
    overheadDollar: '$66,908',
    gaRate: '12.1%',
    loadedRateHr: '$228.40',
  },
  {
    id: 'r3',
    category: 'SW-DEV',
    title: 'Software Developer',
    grade: 'L4',
    baseSalary: '$138,000',
    fringeRate: '32.9%',
    fringeDollar: '$45,402',
    overheadRate: '40.5%',
    overheadDollar: '$55,890',
    gaRate: '11.8%',
    loadedRateHr: '$196.75',
  },
  {
    id: 'r4',
    category: 'QA-LEAD',
    title: 'QA Lead',
    grade: 'L5',
    baseSalary: '$148,200',
    fringeRate: '33.4%',
    fringeDollar: '$49,499',
    overheadRate: '41.0%',
    overheadDollar: '$60,762',
    gaRate: '12.0%',
    loadedRateHr: '$214.20',
  },
  {
    id: 'r5',
    category: 'PM-ANL',
    title: 'PM Analyst',
    grade: 'L3',
    baseSalary: '$112,000',
    fringeRate: '31.2%',
    fringeDollar: '$34,944',
    overheadRate: '38.6%',
    overheadDollar: '$43,232',
    gaRate: '11.2%',
    loadedRateHr: '$168.90',
  },
  {
    id: 'r6',
    category: 'INT-ENG',
    title: 'Integration Engineer',
    grade: 'L4',
    baseSalary: '$134,500',
    fringeRate: '32.6%',
    fringeDollar: '$43,847',
    overheadRate: '40.1%',
    overheadDollar: '$53,935',
    gaRate: '11.6%',
    loadedRateHr: '$189.50',
  },
  {
    id: 'r7',
    category: 'FIELD-ENG',
    title: 'Field Engineer',
    grade: 'L4',
    baseSalary: '$128,800',
    fringeRate: '32.2%',
    fringeDollar: '$41,474',
    overheadRate: '39.4%',
    overheadDollar: '$50,747',
    gaRate: '11.4%',
    loadedRateHr: '$178.25',
  },
  {
    id: 'r8',
    category: 'CONFIG-MGR',
    title: 'Configuration Manager',
    grade: 'L3',
    baseSalary: '$118,600',
    fringeRate: '31.8%',
    fringeDollar: '$37,715',
    overheadRate: '39.0%',
    overheadDollar: '$46,254',
    gaRate: '11.3%',
    loadedRateHr: '$165.40',
  },
  {
    id: 'r9',
    category: 'LOG-SPEC',
    title: 'Logistics Specialist',
    grade: 'L2',
    baseSalary: '$96,400',
    fringeRate: '30.4%',
    fringeDollar: '$29,306',
    overheadRate: '37.2%',
    overheadDollar: '$35,861',
    gaRate: '10.8%',
    loadedRateHr: '$132.15',
  },
]
