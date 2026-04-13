import { useState } from 'react'
import clsx from 'clsx'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {
  HarmonyCard,
  HarmonyIconButton,
  HarmonyTabs,
  HarmonyTab,
  HarmonyTextField,
} from '../harmony/wrappers'
import { ProposalListView } from './ProposalListView'
import './DashboardPage.css'

const coreModules = [
  {
    title: 'Estimating',
    description: 'Build and refine cost estimates with guided workflows.',
    icon: <CalculateOutlinedIcon aria-hidden />,
  },
  {
    title: 'Rates / Tables',
    description: 'Maintain labor, material, and indirect rate structures.',
    icon: <TableChartOutlinedIcon aria-hidden />,
  },
  {
    title: 'Reporting',
    description: 'Run standard and ad hoc reports across proposals.',
    icon: <AssessmentOutlinedIcon aria-hidden />,
  },
  {
    title: 'Libraries',
    description: 'Reuse clauses, BOE snippets, and historical data.',
    icon: <MenuBookOutlinedIcon aria-hidden />,
  },
] as const

const addOnModules = [
  {
    title: 'BOE Authoring',
    description: 'Structured basis-of-estimate narratives linked to WBS.',
    icon: <EditNoteOutlinedIcon aria-hidden />,
  },
  {
    title: 'Materials',
    description: 'Track material takeoffs and vendor quotes.',
    icon: <Inventory2OutlinedIcon aria-hidden />,
  },
  {
    title: 'Cost Volumes',
    description: 'Roll up CLIN and option volumes for pricing scenarios.',
    icon: <StackedBarChartOutlinedIcon aria-hidden />,
  },
  {
    title: 'Program Mgmt',
    description: 'Milestones, staffing, and schedule risk in one view.',
    icon: <AccountTreeOutlinedIcon aria-hidden />,
  },
  {
    title: 'Cashflow',
    description: 'Forecast disbursements and funding profiles.',
    icon: <PaymentsOutlinedIcon aria-hidden />,
  },
] as const

const comingSoon = [
  {
    title: 'Tech Eval',
    description: 'Score technical factors and discriminators consistently.',
    icon: <ScienceOutlinedIcon aria-hidden />,
  },
  {
    title: 'Subcontractor Portal',
    description: 'Invite subs to upload pricing and compliance artifacts.',
    icon: <HandshakeOutlinedIcon aria-hidden />,
  },
] as const

const activities: {
  dot: 'bg-theme' | 'bg-success' | 'bg-info'
  text: string
  time: string
}[] = [
  {
    dot: 'bg-theme',
    text: 'Proposal DARPA-P-2026-04 submitted for review',
    time: 'Today, 9:14 AM',
  },
  {
    dot: 'bg-success',
    text: 'Rate table “FY26-G&A” approved by finance',
    time: 'Yesterday, 4:02 PM',
  },
  {
    dot: 'bg-info',
    text: 'Library pack “Commercial CLINs” published',
    time: 'Mon, 11:20 AM',
  },
]

function MetricCard({
  label,
  value,
  hint,
  hintClass,
}: {
  label: string
  value: string
  hint: string
  hintClass?: string
}) {
  return (
    <HarmonyCard harmonyVariant="elevated" className="h-full">
      <div className="card__body">
        <Typography
          component="p"
          className="text-overline text-secondary"
          sx={{ margin: 0 }}
        >
          {label}
        </Typography>
        <Typography
          component="p"
          className="text-4xl text-primary"
          sx={{ margin: 0, marginTop: 1 }}
        >
          {value}
        </Typography>
        <Typography
          component="p"
          className={clsx('text-sm', hintClass ?? 'text-secondary')}
          sx={{ margin: 0, marginTop: 0.5 }}
        >
          {hint}
        </Typography>
      </div>
    </HarmonyCard>
  )
}

function ModuleTile({
  title,
  description,
  icon,
  footerBadge,
  cardClassName,
}: {
  title: string
  description: string
  icon: React.ReactNode
  footerBadge: { variant: 'primary' | 'pink' | 'orange'; label: string }
  cardClassName?: string
}) {
  return (
    <HarmonyCard
      harmonyVariant="elevated"
      className={clsx('h-full', cardClassName)}
    >
      <div className="card__body flex flex-col gap-2">
        <span className="text-theme">{icon}</span>
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
          sx={{ margin: 0 }}
        >
          {description}
        </Typography>
        <span className={clsx('badge', `badge--${footerBadge.variant}`)}>
          {footerBadge.label}
        </span>
      </div>
    </HarmonyCard>
  )
}

export function DashboardPage() {
  const [tab, setTab] = useState(0)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        minWidth: 0,
        pb: 2,
      }}
    >
      <Box
        className="dashboard-page-header"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 1,
          width: '100%',
          minWidth: 0,
        }}
      >
        <Typography
          component="h1"
          className="text-heading-m text-primary"
          sx={{ margin: 0, flexShrink: 0 }}
        >
          Dashboard
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: 2,
            rowGap: 1.5,
            width: '100%',
            minWidth: 0,
          }}
        >
          <HarmonyTabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            aria-label="Dashboard views"
            sx={{
              minHeight: 0,
              flexShrink: 0,
              flexGrow: 0,
              width: 'max-content',
              maxWidth: '100%',
            }}
          >
            <HarmonyTab label="Module View" />
            <HarmonyTab label="Proposal List" />
          </HarmonyTabs>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: 'wrap',
              alignItems: { xs: 'stretch', sm: 'center' },
              columnGap: 1.5,
              rowGap: 1,
              marginLeft: { xs: 0, sm: 'auto' },
              flexShrink: 0,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            {tab === 0 && (
              <HarmonyTextField
                placeholder="Search proposals, modules, reports…"
                aria-label="Search"
                hiddenLabel
                sx={{
                  flexShrink: 0,
                  flexGrow: 0,
                  width: { xs: '100%', sm: 280 },
                  maxWidth: { xs: '100%', sm: 400 },
                  minWidth: { xs: '100%', sm: 200 },
                }}
              />
            )}
            <HarmonyIconButton
              aria-label="Notifications"
              sx={{ flexShrink: 0, alignSelf: { xs: 'flex-end', sm: 'center' } }}
            >
              <NotificationsIcon />
            </HarmonyIconButton>
          </Box>
        </Box>
      </Box>

      {tab === 0 ? (
        <>
          <Box
            className="rounded-lg bg-theme"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              padding: 3,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="h2"
                className="text-heading-l text-white"
                sx={{ margin: 0 }}
              >
                Good morning, Jane 👋
              </Typography>
              <Typography
                component="p"
                className="text-body-default text-white"
                sx={{ margin: 0, marginTop: 1, opacity: 0.95 }}
              >
                3 proposals in progress · 1 report pending review · 12 flagged
                items need attention
              </Typography>
            </Box>
            <span className="dashboard-hero__pill">9 modules active</span>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <MetricCard
                label="Open proposals"
                value="12"
                hint="+3 this week"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <MetricCard
                label="Submitted YTD"
                value="47"
                hint="Across 6 contracts"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <MetricCard
                label="Avg. cycle time"
                value="4.2d"
                hint="−0.8d vs last qtr"
                hintClass="text-success"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <MetricCard
                label="Flagged items"
                value="12"
                hint="Needs review"
                hintClass="text-error"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <section>
                  <h2 className="dashboard-section-title">Core modules</h2>
                  <Grid container spacing={2}>
                    {coreModules.map((m) => {
                      const to =
                        m.title === 'Estimating'
                          ? '/estimating'
                          : m.title === 'Rates / Tables'
                            ? '/rates-tables'
                            : null
                      const tile = (
                        <ModuleTile
                          title={m.title}
                          description={m.description}
                          icon={m.icon}
                          footerBadge={{ variant: 'primary', label: 'Core' }}
                        />
                      )
                      return (
                        <Grid key={m.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                          {to != null ? (
                            <Link to={to} className="dashboard-page__module-link">
                              {tile}
                            </Link>
                          ) : (
                            tile
                          )}
                        </Grid>
                      )
                    })}
                  </Grid>
                </section>

                <section>
                  <h2 className="dashboard-section-title">Add-on modules</h2>
                  <Grid container spacing={2}>
                    {addOnModules.map((m) => (
                      <Grid key={m.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                        <ModuleTile
                          title={m.title}
                          description={m.description}
                          icon={m.icon}
                          footerBadge={{ variant: 'pink', label: 'Add-On' }}
                          cardClassName="dashboard-card--addon"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </section>

                <section>
                  <h2 className="dashboard-section-title">Coming soon</h2>
                  <Grid container spacing={2}>
                    {comingSoon.map((m) => (
                      <Grid key={m.title} size={{ xs: 12, md: 6 }}>
                        <ModuleTile
                          title={m.title}
                          description={m.description}
                          icon={m.icon}
                          footerBadge={{
                            variant: 'orange',
                            label: 'Coming Soon',
                          }}
                          cardClassName="dashboard-card--soon"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </section>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <HarmonyCard harmonyVariant="elevated">
                  <div className="card__body">
                    <Typography
                      component="h2"
                      className="text-heading-s text-primary"
                      sx={{ margin: 0, marginBottom: 2 }}
                    >
                      Recent activity
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      {activities.map((a) => (
                        <Box
                          component="li"
                          key={a.text}
                          className="dashboard-activity__row"
                        >
                          <span
                            className={clsx(
                              'dashboard-activity__dot',
                              a.dot,
                            )}
                            aria-hidden
                          />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              component="p"
                              className="text-body-default text-primary"
                              sx={{ margin: 0 }}
                            >
                              {a.text}
                            </Typography>
                            <Typography
                              component="p"
                              className="text-caption text-muted"
                              sx={{ margin: 0, marginTop: 0.5 }}
                            >
                              {a.time}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </div>
                </HarmonyCard>

                <HarmonyCard harmonyVariant="elevated">
                  <div className="card__body">
                    <Typography
                      component="h2"
                      className="text-heading-s text-primary"
                      sx={{ margin: 0, marginBottom: 2 }}
                    >
                      Quick actions
                    </Typography>
                    <Grid container spacing={1.5}>
                      {[
                        '+ New Proposal',
                        'Manage Rate Tables',
                        'View Reports',
                        'Open Libraries',
                      ].map((label) => (
                        <Grid key={label} size={6}>
                          <Button
                            type="button"
                            fullWidth
                            variant="text"
                            className={clsx('btn', 'btn--outline', 'btn--sm')}
                          >
                            {label}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </HarmonyCard>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <ProposalListView />
      )}
    </Box>
  )
}
