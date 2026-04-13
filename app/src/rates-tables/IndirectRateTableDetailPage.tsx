import { useMemo, useState } from 'react'
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import {
  getIndirectRateTable,
  LABOR_RATE_CATEGORY_ROWS,
} from './indirectRatesTablesData'
import { HarmonyCard, HarmonyCheckbox, HarmonyTableContainer } from '../harmony/wrappers'
import './IndirectRateTableDetailPage.css'

const FY_OPTIONS = ['FY2024', 'FY2025', 'FY2026'] as const

export function IndirectRateTableDetailPage() {
  const { tableId } = useParams<{ tableId: string }>()
  const table = useMemo(() => getIndirectRateTable(tableId), [tableId])
  const [fy, setFy] = useState<(typeof FY_OPTIONS)[number]>('FY2024')
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})

  if (table == null) {
    return <Navigate to="/rates-tables/indirect-rates" replace />
  }

  const toggleRow = (id: string) => {
    setSelectedRows((s) => ({ ...s, [id]: !s[id] }))
  }

  const toolbarCaption = `Direct Labor Rates · ${LABOR_RATE_CATEGORY_ROWS.length} categories · ${fy}`

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
      <HarmonyCard harmonyVariant="elevated" className="indirect-rate-detail__header-shell">
        <div className="card__body">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 2,
              minWidth: 0,
              flex: '1 1 280px',
            }}
          >
            <div className="indirect-rate-detail__hero-icon">
              <EngineeringOutlinedIcon aria-hidden />
            </div>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="h1"
                className="text-heading-m text-theme"
                sx={{ margin: 0 }}
              >
                {table.name}
              </Typography>
              <Typography
                component="p"
                className="text-body-default"
                sx={{ margin: 0, marginTop: 0.5 }}
              >
                <span className="text-theme">Core · </span>
                <RouterLink
                  to="/rates-tables"
                  className="text-theme indirect-rate-detail__crumb-link"
                >
                  {table.scopeSegment}
                </RouterLink>
                <span className="text-secondary"> {table.globalLine}</span>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
              justifyContent: 'flex-end',
              flex: '1 1 auto',
            }}
          >
            <div
              className="indirect-rate-detail__fy-group"
              role="group"
              aria-label="Fiscal year"
            >
              {FY_OPTIONS.map((label) => (
                <Button
                  key={label}
                  type="button"
                  variant="text"
                  className={
                    fy === label ? 'btn btn--primary btn--sm' : 'btn btn--outline btn--sm'
                  }
                  onClick={() => setFy(label)}
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button
              component={RouterLink}
              to="/rates-tables/indirect-rates"
              variant="text"
              className="btn btn--outline btn--sm"
            >
              ← Back to List
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
              + Add Category
            </Button>
          </Box>
        </div>
      </HarmonyCard>

      <Box>
        <Box
          className="indirect-rate-detail__table-toolbar"
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
              Import Rates
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
                  <span className="text-overline text-secondary">Labor category</span>
                </TableCell>
                <TableCell scope="col">
                  <span className="text-overline text-secondary">Title</span>
                </TableCell>
                <TableCell scope="col">
                  <span className="text-overline text-secondary">Grade</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">Base salary</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">Fringe rate</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">Fringe $</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">Overhead rate</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">Overhead $</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">G&A rate</span>
                </TableCell>
                <TableCell scope="col" align="right">
                  <span className="text-overline text-secondary">Loaded rate / hr</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LABOR_RATE_CATEGORY_ROWS.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <HarmonyCheckbox
                      size="small"
                      checked={Boolean(selectedRows[row.id])}
                      onChange={() => toggleRow(row.id)}
                      slotProps={{
                        input: {
                          'aria-label': `Select ${row.category}`,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-body-emphasized text-primary">
                      {row.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-body-default text-secondary">{row.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-body-default text-secondary">{row.grade}</span>
                  </TableCell>
                  <TableCell
                    align="right"
                    className="indirect-rate-detail__cell--base-salary"
                  >
                    <span className="text-body-default text-primary">
                      {row.baseSalary}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-default text-secondary">
                      {row.fringeRate}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-default text-secondary">
                      {row.fringeDollar}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-default text-secondary">
                      {row.overheadRate}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-default text-secondary">
                      {row.overheadDollar}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-default text-secondary">{row.gaRate}</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-body-default text-primary">
                      {row.loadedRateHr}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </HarmonyTableContainer>
      </Box>
    </Box>
  )
}
