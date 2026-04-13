import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined'
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined'
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { KeyboardEvent, ReactNode } from 'react'
import { HarmonyCard } from '../harmony/wrappers'
import clsx from 'clsx'
import './RatesTablesPage.css'

type RateTableTypeId =
  | 'algorithms'
  | 'asset-tables'
  | 'cer-factors'
  | 'cer-tables'
  | 'composite-rates'
  | 'direct-rates'
  | 'exchange-rates'
  | 'indirect-rates'
  | 'rate-bands'
  | 'resource-set-tables'
  | 'scheduled-rates'
  | 'tm-rates'
  | 'title-tables'
  | 'travel-rates'
  | 'work-schedule-tables'

type RateTableTypeDef = {
  id: RateTableTypeId
  title: string
  description: string
  tableCount: number
  icon: ReactNode
}

const RATE_TABLE_TYPES: RateTableTypeDef[] = [
  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Custom calculation algorithms',
    tableCount: 3,
    icon: <SettingsOutlinedIcon aria-hidden />,
  },
  {
    id: 'asset-tables',
    title: 'Asset Tables',
    description: 'Equipment & asset cost schedules',
    tableCount: 5,
    icon: <PrecisionManufacturingOutlinedIcon aria-hidden />,
  },
  {
    id: 'cer-factors',
    title: 'CER Factors',
    description: 'Cost estimating relationship factors',
    tableCount: 8,
    icon: <CalculateOutlinedIcon aria-hidden />,
  },
  {
    id: 'cer-tables',
    title: 'CER Tables',
    description: 'Full CER table definitions',
    tableCount: 12,
    icon: <BarChartOutlinedIcon aria-hidden />,
  },
  {
    id: 'composite-rates',
    title: 'Composite Rates',
    description: 'Combined multi-pool rate structures',
    tableCount: 4,
    icon: <ExtensionOutlinedIcon aria-hidden />,
  },
  {
    id: 'direct-rates',
    title: 'Direct Rates',
    description: 'Labor category direct hourly rates',
    tableCount: 14,
    icon: <EngineeringOutlinedIcon aria-hidden />,
  },
  {
    id: 'exchange-rates',
    title: 'Exchange Rates',
    description: 'Currency conversion rate tables',
    tableCount: 6,
    icon: <CurrencyExchangeOutlinedIcon aria-hidden />,
  },
  {
    id: 'indirect-rates',
    title: 'Indirect Rates',
    description: 'Overhead, G&A, fringe & other indirect',
    tableCount: 9,
    icon: <ApartmentOutlinedIcon aria-hidden />,
  },
  {
    id: 'rate-bands',
    title: 'Rate Bands',
    description: 'Banded rate structures by threshold',
    tableCount: 5,
    icon: <ViewWeekOutlinedIcon aria-hidden />,
  },
  {
    id: 'resource-set-tables',
    title: 'Resource Set Tables',
    description: 'Defined resource set configurations',
    tableCount: 7,
    icon: <Groups2OutlinedIcon aria-hidden />,
  },
  {
    id: 'scheduled-rates',
    title: 'Scheduled Rates',
    description: 'Time-phased rate schedules by period',
    tableCount: 11,
    icon: <CalendarMonthOutlinedIcon aria-hidden />,
  },
  {
    id: 'tm-rates',
    title: 'T&M Rates',
    description: 'Time & materials labor rate tables',
    tableCount: 6,
    icon: <HandymanOutlinedIcon aria-hidden />,
  },
  {
    id: 'title-tables',
    title: 'Title Tables',
    description: 'Labor title & classification tables',
    tableCount: 3,
    icon: <AssignmentOutlinedIcon aria-hidden />,
  },
  {
    id: 'travel-rates',
    title: 'Travel Rates',
    description: 'GSA per diem & travel rate tables',
    tableCount: 4,
    icon: <FlightOutlinedIcon aria-hidden />,
  },
  {
    id: 'work-schedule-tables',
    title: 'Work Schedule Tables',
    description: 'Work calendar & schedule definitions',
    tableCount: 3,
    icon: <EventNoteOutlinedIcon aria-hidden />,
  },
]

function RateTypeCard({
  title,
  description,
  tableCount,
  icon,
  selected,
  onSelect,
}: {
  title: string
  description: string
  tableCount: number
  icon: ReactNode
  selected: boolean
  onSelect: () => void
}) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect()
      }
    },
    [onSelect]
  )

  return (
    <HarmonyCard
      harmonyVariant="elevated"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${title}, ${tableCount} tables`}
      className={clsx(
        'rates-tables-card',
        selected && 'rates-tables-card--selected'
      )}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <div className="card__body flex flex-col items-stretch">
        <span className="rates-tables-card__icon">{icon}</span>
        <Typography
          component="h3"
          className="text-heading-s text-primary"
          sx={{ margin: 0 }}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          className="text-body-default text-secondary flex-1"
          sx={{ margin: 0, marginTop: 1 }}
        >
          {description}
        </Typography>
        <span className="rates-tables-card__count link text-sm">
          {tableCount} {tableCount === 1 ? 'table' : 'tables'}
        </span>
      </div>
    </HarmonyCard>
  )
}

export function RatesTablesPage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<RateTableTypeId>('exchange-rates')

  const handleSelectRateType = (id: RateTableTypeId) => {
    if (id === 'indirect-rates') {
      navigate('/rates-tables/indirect-rates')
      return
    }
    setSelectedId(id)
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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: 2,
            minWidth: 0,
          }}
        >
          <div className="rates-tables-page__hero-icon-wrap">
            <TableChartOutlinedIcon
              sx={{ fontSize: 'calc(var(--space-6) + var(--space-1))' }}
              aria-hidden
            />
          </div>
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Typography
                component="h1"
                className="text-heading-m text-theme"
                sx={{ margin: 0 }}
              >
                Rates / Tables
              </Typography>
              <span className="badge badge--primary">Core</span>
            </Box>
            <Typography
              component="p"
              className="text-body-default text-secondary"
              sx={{ margin: 0, marginTop: 0.5 }}
            >
              Global entity — shared across all proposals
            </Typography>
          </Box>
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
            Import Rates
          </Button>
          <Button
            type="button"
            variant="text"
            className="btn btn--primary btn--sm"
          >
            + New Rate Table
          </Button>
        </Box>
      </Box>

      <Typography
        component="h2"
        className="text-heading-s text-theme"
        sx={{ margin: 0 }}
      >
        Select a Rate / Table Type
      </Typography>

      <div className="rates-tables-page__grid" role="list">
        {RATE_TABLE_TYPES.map((t) => (
          <div key={t.id} role="listitem">
            <RateTypeCard
              title={t.title}
              description={t.description}
              tableCount={t.tableCount}
              icon={t.icon}
              selected={selectedId === t.id}
              onSelect={() => handleSelectRateType(t.id)}
            />
          </div>
        ))}
      </div>
    </Box>
  )
}
