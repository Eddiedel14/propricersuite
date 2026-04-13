import { Routes, Route } from 'react-router-dom'
import { DashboardPage } from './dashboard/DashboardPage'
import { EstimatingPage } from './estimating/EstimatingPage'
import { IndirectRateTableDetailPage } from './rates-tables/IndirectRateTableDetailPage'
import { IndirectRatesPage } from './rates-tables/IndirectRatesPage'
import { RatesTablesPage } from './rates-tables/RatesTablesPage'
import { ShellLayout } from './shell/ShellLayout'

const footerTabs = [
  { id: 'tab-1', label: 'Home', active: true },
  { id: 'tab-2', label: 'Projects', icon: 'building-office' },
  { id: 'tab-3', label: 'Reports', icon: 'Report' },
]

function App() {
  return (
    <ShellLayout
      productName="ProPricer Suite"
      logoSrc="/logos/PPMLogo.svg"
      showFooter
      showFloatingNav={false}
      tabs={footerTabs}
      leftSidebarVariant="ppm"
      rightSidebarVariant="ppm"
      pageHeaderTitle=""
    >
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/estimating" element={<EstimatingPage />} />
        <Route path="/rates-tables" element={<RatesTablesPage />} />
        <Route
          path="/rates-tables/indirect-rates/:tableId"
          element={<IndirectRateTableDetailPage />}
        />
        <Route
          path="/rates-tables/indirect-rates"
          element={<IndirectRatesPage />}
        />
      </Routes>
    </ShellLayout>
  )
}

export default App
