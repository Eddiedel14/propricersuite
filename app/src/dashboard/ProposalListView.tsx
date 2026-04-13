import { useState } from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import {
  HarmonyButton,
  HarmonyChip,
  HarmonyLink,
  HarmonyMenu,
  HarmonyMenuItem,
  HarmonyTableContainer,
  HarmonyTextField,
} from '../harmony/wrappers'
import './ProposalListView.css'

type ProposalStatus = 'inReview' | 'active' | 'draft' | 'submitted'

const STATUS_LABELS: Record<ProposalStatus, string> = {
  inReview: 'In Review',
  active: 'Active',
  draft: 'Draft',
  submitted: 'Submitted',
}

const PROPOSAL_ROWS: {
  id: string
  title: string
  customer: string
  status: ProposalStatus
  due: string
}[] = [
  {
    id: 'DARPA-P-2026-04',
    title: 'DARPA Advanced Sensors Program',
    customer: 'DARPA',
    status: 'inReview',
    due: 'Apr 15, 2026',
  },
  {
    id: 'NAVY-P-2026-11',
    title: 'Fleet Readiness Analytics',
    customer: 'US Navy',
    status: 'active',
    due: 'Apr 22, 2026',
  },
  {
    id: 'INT-P-2026-02',
    title: 'Indirect Rate Refresh FY26',
    customer: 'Internal',
    status: 'draft',
    due: 'May 1, 2026',
  },
  {
    id: 'ARMY-P-2025-88',
    title: 'Ground Systems Modernization',
    customer: 'US Army',
    status: 'submitted',
    due: 'Mar 30, 2026',
  },
  {
    id: 'NASA-P-2026-01',
    title: 'Launch Support Services',
    customer: 'NASA',
    status: 'inReview',
    due: 'Apr 8, 2026',
  },
  {
    id: 'COMM-P-2026-19',
    title: 'Commercial Satellite Lease',
    customer: 'Acme Corp',
    status: 'active',
    due: 'May 12, 2026',
  },
  {
    id: 'DHS-P-2026-07',
    title: 'Border Logistics Study',
    customer: 'DHS',
    status: 'draft',
    due: 'Jun 2, 2026',
  },
]

function StatusChip({ status }: { status: ProposalStatus }) {
  if (status === 'inReview') {
    return (
      <HarmonyChip
        size="small"
        label={STATUS_LABELS[status]}
        color="info"
        variant="filled"
      />
    )
  }
  if (status === 'active') {
    return (
      <HarmonyChip
        size="small"
        label={STATUS_LABELS[status]}
        color="success"
        variant="filled"
      />
    )
  }
  if (status === 'draft') {
    return (
      <HarmonyChip
        size="small"
        label={STATUS_LABELS[status]}
        color="default"
        variant="filled"
      />
    )
  }
  return (
    <HarmonyChip
      size="small"
      label={STATUS_LABELS[status]}
      variant="outlined"
      className="proposal-list__chip--submitted"
    />
  )
}

function FilterMenuButton({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const open = Boolean(anchor)
  return (
    <>
      <HarmonyButton
        harmonyVariant="secondary"
        harmonySize="sm"
        endIcon={
          <KeyboardArrowDownIcon className="text-muted" fontSize="small" />
        }
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        {label}: {value}
      </HarmonyButton>
      <HarmonyMenu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {options.map((opt) => (
          <HarmonyMenuItem
            key={opt}
            selected={opt === value}
            onClick={() => {
              onChange(opt)
              setAnchor(null)
            }}
          >
            {opt}
          </HarmonyMenuItem>
        ))}
      </HarmonyMenu>
    </>
  )
}

export function ProposalListView() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Due Date')

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          rowGap: 2,
          width: '100%',
        }}
      >
        <HarmonyTextField
          placeholder="Search proposals by name, number, or customer…"
          aria-label="Search proposals"
          hiddenLabel
          sx={{
            flex: '1 1 240px',
            minWidth: { xs: '100%', sm: 280 },
            maxWidth: { xs: '100%', sm: 'none' },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-muted" fontSize="small" aria-hidden />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1.5,
            marginLeft: { xs: 0, md: 'auto' },
          }}
        >
          <FilterMenuButton
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={['All', 'In Review', 'Active', 'Draft', 'Submitted']}
          />
          <FilterMenuButton
            label="Sort"
            value={sortBy}
            onChange={setSortBy}
            options={['Due Date', 'Name', 'Customer', 'Status']}
          />
          <HarmonyButton harmonyVariant="primary">+ New Proposal</HarmonyButton>
        </Box>
      </Box>

      <HarmonyTableContainer
        headerVariant="gray"
        sx={{ width: '100%', overflowX: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col">
                <span className="text-overline text-secondary">Proposal</span>
              </TableCell>
              <TableCell scope="col">
                <span className="text-overline text-secondary">Customer</span>
              </TableCell>
              <TableCell scope="col">
                <span className="text-overline text-secondary">Status</span>
              </TableCell>
              <TableCell scope="col">
                <span className="text-overline text-secondary">Due date</span>
              </TableCell>
              <TableCell scope="col">
                <span className="text-overline text-secondary">
                  Open in module
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PROPOSAL_ROWS.map((row) => (
              <TableRow key={row.id} className="proposal-list__row">
                <TableCell>
                  <Typography
                    component="div"
                    className="text-body-emphasized text-theme"
                    sx={{ margin: 0 }}
                  >
                    {row.title}
                  </Typography>
                  <Typography
                    component="div"
                    className="text-caption text-muted"
                    sx={{ margin: 0, marginTop: 0.5 }}
                  >
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <span className="text-body-default text-primary">
                    {row.customer}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusChip status={row.status} />
                </TableCell>
                <TableCell>
                  <span className="text-body-default text-secondary">
                    {row.due}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="proposal-list__open-cell">
                    <HarmonyLink href="#" className="text-sm">
                      → Open in
                    </HarmonyLink>
                    <span className="proposal-list__module-chips">
                      <Link
                        to="/estimating"
                        className="proposal-list__estimating-link"
                      >
                        <HarmonyChip
                          size="small"
                          label="Estimating"
                          color="primary"
                          variant="outlined"
                          component="span"
                        />
                      </Link>
                      <HarmonyChip
                        size="small"
                        label="Reporting"
                        color="primary"
                        variant="outlined"
                      />
                      <HarmonyChip
                        size="small"
                        label="Cost Volumes"
                        variant="outlined"
                        className="proposal-list__chip--addon"
                      />
                      <HarmonyChip
                        size="small"
                        label="BOE Authoring"
                        variant="outlined"
                        className="proposal-list__chip--addon"
                      />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </HarmonyTableContainer>

      <Typography
        component="p"
        className="text-caption text-muted text-center"
        sx={{ margin: 0 }}
      >
        Hover a row to reveal module entry points ·{' '}
        <span className="proposal-list__legend-core">Blue</span> = Core ·{' '}
        <span className="proposal-list__legend-addon">Purple</span> = Add-On ·
        12 proposals total, showing {PROPOSAL_ROWS.length}
      </Typography>
    </Box>
  )
}
