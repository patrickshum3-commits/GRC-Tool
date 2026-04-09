import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/app/layout/AppLayout';
import { AuditsPage } from '@/pages/AuditsPage';
import { ControlsPage } from '@/pages/ControlsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { EvidencePage } from '@/pages/EvidencePage';
import { FrameworksPage } from '@/pages/FrameworksPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { RisksPage } from '@/pages/RisksPage';
import { SettingsPage } from '@/pages/SettingsPage';

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/frameworks" element={<FrameworksPage />} />
      <Route path="/controls" element={<ControlsPage />} />
      <Route path="/risks" element={<RisksPage />} />
      <Route path="/audits" element={<AuditsPage />} />
      <Route path="/evidence" element={<EvidencePage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
