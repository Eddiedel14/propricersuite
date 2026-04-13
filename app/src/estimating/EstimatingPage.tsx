import { useState } from 'react'
import { Link } from 'react-router-dom'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import {
  HarmonyCheckbox,
  HarmonyChip,
  HarmonyNativeSelect,
  HarmonyTab,
  HarmonyTableContainer,
  HarmonyTabs,
} from '../harmony/wrappers'
import './EstimatingPage.css'

const SUB_TABS = [
  'Labor',
  'Travel',
  'CERs',
  'BOEs',
  'SOW',
  'Notes',
  'Resource Sets',
  'Formulas',
  'Allocations',
] as const

const EMPTY_SUBTITLE = 'Input grid for this section would appear here'

type SubTabPanel =
  | { mode: 'labor' }
  | { mode: 'travel' }
  | { mode: 'empty'; caption: string; emptyHeading: string }

const SUB_TAB_PANELS: SubTabPanel[] = [
  { mode: 'labor' },
  { mode: 'travel' },
  {
    mode: 'empty',
    caption: 'Cost Estimating Relationships',
    emptyHeading: 'Cost Estimating Relationships',
  },
  { mode: 'empty', caption: 'BOE Inputs', emptyHeading: 'BOE Inputs' },
  {
    mode: 'empty',
    caption: 'Statement of Work',
    emptyHeading: 'Statement of Work',
  },
  { mode: 'empty', caption: 'Notes', emptyHeading: 'Notes' },
  {
    mode: 'empty',
    caption: 'Resource Sets',
    emptyHeading: 'Resource Sets',
  },
  { mode: 'empty', caption: 'Formulas', emptyHeading: 'Formulas' },
  { mode: 'empty', caption: 'Allocations', emptyHeading: 'Allocations' },
]

type LaborRow = {
  id: string
  wbs: string
  task: string
  category: string
  description: string
  y1: number
  y2: number
  y3: number
  loadedRate: string
  totalCost: string
}

const LABOR_ROWS: LaborRow[] = [
  {
    id: '1',
    wbs: '1.1',
    task: 'Systems Eng',
    category: 'Sr. Engineer',
    description: 'Lead systems design',
    y1: 320,
    y2: 340,
    y3: 360,
    loadedRate: '$215.40',
    totalCost: '$301,560',
  },
  {
    id: '2',
    wbs: '1.2',
    task: 'Software Dev',
    category: 'Test Engineer',
    description: 'Architecture & backend',
    y1: 480,
    y2: 520,
    y3: 510,
    loadedRate: '$198.20',
    totalCost: '$298,944',
  },
  {
    id: '3',
    wbs: '1.3',
    task: 'Integration',
    category: 'Integration Lead',
    description: 'Subsystem integration',
    y1: 240,
    y2: 260,
    y3: 280,
    loadedRate: '$205.00',
    totalCost: '$160,100',
  },
  {
    id: '4',
    wbs: '2.1',
    task: 'PM Support',
    category: 'PM Analyst',
    description: 'Schedule & reporting',
    y1: 400,
    y2: 400,
    y3: 420,
    loadedRate: '$142.50',
    totalCost: '$174,150',
  },
  {
    id: '5',
    wbs: '2.2',
    task: 'Quality',
    category: 'QA Specialist',
    description: 'Test planning',
    y1: 180,
    y2: 200,
    y3: 200,
    loadedRate: '$128.75',
    totalCost: '$74,775',
  },
  {
    id: '6',
    wbs: '3.1',
    task: 'Field Support',
    category: 'Field Eng',
    description: 'Site surveys',
    y1: 120,
    y2: 140,
    y3: 160,
    loadedRate: '$189.00',
    totalCost: '$79,260',
  },
  {
    id: '7',
    wbs: '3.2',
    task: 'Training',
    category: 'Trainer',
    description: 'Operator training',
    y1: 80,
    y2: 90,
    y3: 100,
    loadedRate: '$95.25',
    totalCost: '$25,717',
  },
  {
    id: '8',
    wbs: '4.0',
    task: 'Closeout',
    category: 'PM',
    description: 'Deliverable closeout',
    y1: 60,
    y2: 60,
    y3: 80,
    loadedRate: '$176.00',
    totalCost: '$35,200',
  },
]

type TravelRow = {
  id: string
  wbs: string
  task: string
  tripPurpose: string
  destination: string
  travelers: number
  trips: number
  days: number
  perDiem: string
  airfare: string
  totalCost: number
}

const TRAVEL_ROWS: TravelRow[] = [
  {
    id: 't1',
    wbs: '1.1',
    task: 'Systems Eng',
    tripPurpose: 'Kickoff Meeting',
    destination: 'Washington, DC',
    travelers: 3,
    trips: 1,
    days: 2,
    perDiem: '$258',
    airfare: '$420',
    totalCost: 3708,
  },
  {
    id: 't2',
    wbs: '1.2',
    task: 'Software Dev',
    tripPurpose: 'Design Review',
    destination: 'Boston, MA',
    travelers: 2,
    trips: 2,
    days: 3,
    perDiem: '$258',
    airfare: '$650',
    totalCost: 4124,
  },
  {
    id: 't3',
    wbs: '2.1',
    task: 'PM Support',
    tripPurpose: 'Quarterly Review',
    destination: 'Denver, CO',
    travelers: 4,
    trips: 2,
    days: 2,
    perDiem: '$258',
    airfare: '$800',
    totalCost: 5012,
  },
  {
    id: 't4',
    wbs: '3.1',
    task: 'Field Support',
    tripPurpose: 'Site Survey',
    destination: 'Austin, TX',
    travelers: 2,
    trips: 3,
    days: 4,
    perDiem: '$258',
    airfare: '$550',
    totalCost: 5012,
  },
]

function rowTotalHrs(r: LaborRow) {
  return r.y1 + r.y2 + r.y3
}

function formatTravelCurrency(n: number) {
  return `$${n.toLocaleString('en-US')}`
}

function EstimatingEmptyPanel({ heading }: { heading: string }) {
  return (
    <Box
      className="estimating-page__empty-shell"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        px: 4,
        py: 6,
        textAlign: 'center',
      }}
    >
      <AssignmentOutlinedIcon
        className="estimating-page__empty-icon"
        sx={{ fontSize: 'var(--space-14)' }}
        aria-hidden
      />
      <Typography
        component="h2"
        className="text-heading-s text-primary"
        sx={{ margin: 0 }}
      >
        {heading}
      </Typography>
      <Typography
        component="p"
        className="text-body-default text-secondary"
        sx={{ margin: 0, maxWidth: 'min(100%, calc(var(--space-24) * 6))' }}
      >
        {EMPTY_SUBTITLE}
      </Typography>
    </Box>
  )
}

export function EstimatingPage() {
  const [subTab, setSubTab] = useState(0)
  const [laborSelected, setLaborSelected] = useState<Record<string, boolean>>({})
  const [travelSelected, setTravelSelected] = useState<Record<string, boolean>>({})

  const panel = SUB_TAB_PANELS[subTab]
  const totalHrs = LABOR_ROWS.reduce((acc, r) => acc + rowTotalHrs(r), 0)
  const travelGrandTotal = TRAVEL_ROWS.reduce((acc, r) => acc + r.totalCost, 0)

  const toolbarCaption =
    panel.mode === 'labor'
      ? `Labor inputs · ${LABOR_ROWS.length} rows`
      : panel.mode === 'travel'
        ? `Travel inputs · ${TRAVEL_ROWS.length} rows`
        : panel.caption

  const toggleLabor = (id: string) => {
    setLaborSelected((s) => ({ ...s, [id]: !s[id] }))
  }

  const toggleTravel = (id: string) => {
    setTravelSelected((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        minWidth: 0,
        pb: 4,
      }}
    >
      <Link to="/" className="link text-sm">
        ← Back to dashboard
      </Link>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          rowGap: 2,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, minWidth: 0 }}>
          <ViewModuleIcon className="text-secondary" fontSize="large" aria-hidden />
          <Box>
            <Typography
              component="h1"
              className="text-heading-m text-theme"
              sx={{ margin: 0 }}
            >
              Estimating
            </Typography>
            <span className="badge badge--primary">Core</span>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexWrap: 'wrap',
            minWidth: { xs: '100%', sm: 240 },
          }}
        >
          <span className="text-label text-secondary">Proposal</span>
          <HarmonyNativeSelect
            defaultValue="darpa"
            inputProps={{ id: 'estimating-proposal', 'aria-label': 'Proposal' }}
            formControlProps={{
              className: 'form-group',
              sx: { minWidth: { xs: '100%', sm: 280 }, maxWidth: '100%' },
              fullWidth: false,
            }}
          >
            <option value="darpa">DARPA Advanced Sensors Program</option>
            <option value="navy">Fleet Readiness Analytics</option>
            <option value="army">Ground Systems Modernization</option>
          </HarmonyNativeSelect>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          <Button
            type="button"
            variant="text"
            className="btn btn--outline btn--sm"
          >
            Import
          </Button>
          <Button
            type="button"
            variant="text"
            className="btn btn--outline btn--sm"
          >
            Export
          </Button>
          <Button
            type="button"
            variant="text"
            className="btn btn--primary btn--sm"
          >
            + Add Row
          </Button>
        </Box>
      </Box>

      <Box className="estimating-page__tab-bar" sx={{ px: 1, py: 0.5 }}>
        <HarmonyTabs
          value={subTab}
          onChange={(_, v) => setSubTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Estimating worksheet tabs"
          sx={{ minHeight: 0 }}
        >
          {SUB_TABS.map((label, i) => (
            <HarmonyTab key={label} label={label} value={i} />
          ))}
        </HarmonyTabs>
      </Box>

      <Box>
        <Box
          className="estimating-page__table-toolbar"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 2,
            py: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            <Button type="button" variant="text" className="btn btn--primary btn--sm">
              + Add Row
            </Button>
            <Button type="button" variant="text" className="btn btn--outline btn--sm">
              Delete
            </Button>
            <Button type="button" variant="text" className="btn btn--outline btn--sm">
              Copy
            </Button>
            <Button type="button" variant="text" className="btn btn--outline btn--sm">
              Paste
            </Button>
            <Button
              type="button"
              variant="text"
              className="btn btn--outline btn--sm"
              startIcon={<FilterListIcon fontSize="small" />}
            >
              Filter
            </Button>
          </Box>
          <Typography
            component="span"
            className="text-body-default text-secondary"
            sx={{ margin: 0 }}
          >
            {toolbarCaption}
          </Typography>
        </Box>

        {panel.mode === 'labor' && (
          <HarmonyTableContainer
            headerVariant="gray"
            sx={{
              width: '100%',
              overflowX: 'auto',
              border: '1px solid var(--border-light)',
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-md) var(--radius-md)',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" scope="col" />
                  <TableCell scope="col">
                    <span className="text-overline text-secondary">WBS / Task</span>
                  </TableCell>
                  <TableCell scope="col">
                    <span className="text-overline text-secondary">Labor category</span>
                  </TableCell>
                  <TableCell scope="col">
                    <span className="text-overline text-secondary">Description</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Hrs Y1</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Hrs Y2</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Hrs Y3</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Total hrs</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Loaded rate</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Total cost</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LABOR_ROWS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <HarmonyCheckbox
                        size="small"
                        checked={Boolean(laborSelected[row.id])}
                        onChange={() => toggleLabor(row.id)}
                        slotProps={{
                          input: {
                            'aria-label': `Select ${row.task}`,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        className="text-body-emphasized text-primary"
                      >
                        {row.wbs}
                      </Typography>{' '}
                      <span className="text-body-default text-secondary">{row.task}</span>
                    </TableCell>
                    <TableCell>
                      <HarmonyChip
                        size="small"
                        label={row.category}
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell className="estimating-table__cell--description">
                      <span className="text-body-default text-primary">
                        {row.description}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-secondary">{row.y1}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-secondary">{row.y2}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-secondary">{row.y3}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-primary">
                        {rowTotalHrs(row).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-secondary">
                        {row.loadedRate}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-primary">
                        {row.totalCost}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="table-row--total">
                  <TableCell colSpan={7} align="right">
                    <span className="text-body-emphasized text-primary">Totals</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-emphasized text-primary">
                      {totalHrs.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell />
                  <TableCell align="right">
                    <span className="estimating-table__footer-cost">$1,789,284</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </HarmonyTableContainer>
        )}

        {panel.mode === 'travel' && (
          <HarmonyTableContainer
            headerVariant="gray"
            sx={{
              width: '100%',
              overflowX: 'auto',
              border: '1px solid var(--border-light)',
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-md) var(--radius-md)',
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" scope="col" />
                  <TableCell scope="col">
                    <span className="text-overline text-secondary">WBS / Task</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Trip purpose</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Destination</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    align="right"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Travelers</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    align="right"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Trips</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    align="right"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Days</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    align="right"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Per diem</span>
                  </TableCell>
                  <TableCell
                    scope="col"
                    align="right"
                    className="estimating-table__cell--travel-input"
                  >
                    <span className="text-overline text-secondary">Airfare/trip</span>
                  </TableCell>
                  <TableCell scope="col" align="right">
                    <span className="text-overline text-secondary">Total cost</span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TRAVEL_ROWS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <HarmonyCheckbox
                        size="small"
                        checked={Boolean(travelSelected[row.id])}
                        onChange={() => toggleTravel(row.id)}
                        slotProps={{
                          input: {
                            'aria-label': `Select ${row.task} travel row`,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        className="text-body-emphasized text-primary"
                      >
                        {row.wbs}
                      </Typography>{' '}
                      <span className="text-body-default text-secondary">{row.task}</span>
                    </TableCell>
                    <TableCell className="estimating-table__cell--travel-input">
                      <span className="text-body-default text-primary">
                        {row.tripPurpose}
                      </span>
                    </TableCell>
                    <TableCell className="estimating-table__cell--travel-input">
                      <span className="text-body-default text-primary">
                        {row.destination}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      className="estimating-table__cell--travel-input"
                    >
                      <span className="text-body-default text-secondary">
                        {row.travelers}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      className="estimating-table__cell--travel-input"
                    >
                      <span className="text-body-default text-secondary">
                        {row.trips}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      className="estimating-table__cell--travel-input"
                    >
                      <span className="text-body-default text-secondary">
                        {row.days}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      className="estimating-table__cell--travel-input"
                    >
                      <span className="text-body-default text-secondary">
                        {row.perDiem}
                      </span>
                    </TableCell>
                    <TableCell
                      align="right"
                      className="estimating-table__cell--travel-input"
                    >
                      <span className="text-body-default text-secondary">
                        {row.airfare}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-body-default text-primary">
                        {formatTravelCurrency(row.totalCost)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="table-row--total">
                  <TableCell colSpan={9} align="right">
                    <span className="text-body-emphasized text-primary">Totals</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="estimating-table__footer-cost">
                      {formatTravelCurrency(travelGrandTotal)}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </HarmonyTableContainer>
        )}

        {panel.mode === 'empty' && (
          <Box
            className="estimating-page__empty-wrap"
            sx={{
              border: '1px solid var(--border-light)',
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-md) var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: 'var(--surface-bg)',
            }}
          >
            <EstimatingEmptyPanel heading={panel.emptyHeading} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
