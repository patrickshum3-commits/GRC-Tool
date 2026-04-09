import { useAppState } from '@/app/AppStateContext';
import { PageHeader } from '@/components/PageHeader';
import { reportExport } from '@/features/common/reportExport';

export const ReportsPage = () => {
  const { state } = useAppState();

  return (
    <section>
      <PageHeader title="Reports" subtitle="Generate consultant-ready outputs" />
      <div className="grid">
        <div className="card"><button onClick={() => reportExport.internalAudit(state)}>Internal audit report</button></div>
        <div className="card"><button onClick={() => reportExport.riskSummary(state)}>Risk assessment summary</button></div>
        <div className="card"><button onClick={() => reportExport.managementReview(state)}>Management review summary</button></div>
        <div className="card"><button onClick={() => reportExport.statementOfApplicability(state)}>Statement of Applicability output</button></div>
        <div className="card"><button onClick={() => reportExport.pciGapSummary(state)}>PCI DSS gap summary</button></div>
      </div>
    </section>
  );
};
