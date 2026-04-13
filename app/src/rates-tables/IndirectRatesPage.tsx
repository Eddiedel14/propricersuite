import { Link as RouterLink } from 'react-router-dom'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { HarmonyTableContainer, HarmonyCard } from '../harmony/wrappers'
import { INDIRECT_RATE_TABLES } from './indirectRatesTablesData'
import './IndirectRatesPage.css'

export function IndirectRatesPage() {
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
      <HarmonyCard harmonyVariant="elevated" className="indirect-rates-page__header-shell">
        <div className="card__body">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 2,
              minWidth: 0,
              flex: '1 1 240px',
            }}
          >
            <div className="indirect-rates-page__header-icon">
              <ApartmentOutlinedIcon aria-hidden />
            </div>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component={RouterLink}
                to="/rates-tables"
                className="text-heading-m text-theme indirect-rates-page__title-link"
                sx={{ margin: 0 }}
              >
                Indirect Rates
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 1,
                  marginTop: 0.5,
                }}
              >
                <span className="badge badge--primary">Core</span>
                <Typography
                  component="span"
                  className="text-caption text-secondary"
                  sx={{ margin: 0 }}
                >
                  ·
                </Typography>
                <Typography
                  component="span"
                  className="text-caption text-secondary"
                  sx={{ margin: 0 }}
                >
                  Rates / Tables
                </Typography>
              </Box>
              <Typography
                component="p"
                className="text-body-default text-secondary"
                sx={{ margin: 0, marginTop: 0.5 }}
              >
                Global entity — available to all proposals
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Button
              component={RouterLink}
              to="/rates-tables"
              variant="text"
              className="btn btn--outline btn--sm"
            >
              ← All Rate Types
            </Button>
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
              className="btn btn--primary btn--sm"
            >
              + New Table
            </Button>
          </Box>
        </div>
      </HarmonyCard>

      <HarmonyTableContainer
        headerVariant="gray"
        sx={{
          width: '100%',
          overflowX: 'auto',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell scope="col">
                <span className="text-overline text-secondary">Table name</span>
              </TableCell>
              <TableCell scope="col">
                <span className="text-overline text-secondary">FY range</span>
              </TableCell>
              <TableCell scope="col">
                <span className="text-overline text-secondary">Categories</span>
              </TableCell>
              <TableCell scope="col" align="right">
                <span className="text-overline text-secondary">Last modified</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {INDIRECT_RATE_TABLES.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/rates-tables/indirect-rates/${row.id}`}
                    variant="text"
                    className="indirect-rates-page__table-name-btn link text-body-emphasized text-primary"
                  >
                    {row.name}
                  </Button>
                  <Typography
                    component="p"
                    className="text-caption text-secondary"
                    sx={{ margin: 0, marginTop: 0.5 }}
                  >
                    {row.subtitle}
                  </Typography>
                </TableCell>
                <TableCell>
                  <span className="text-body-default text-secondary">
                    {row.fyRange}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-body-default text-secondary">
                    {row.categoriesLabel}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span className="text-body-default text-secondary">
                    {row.lastModified}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </HarmonyTableContainer>
    </Box>
  )
}
