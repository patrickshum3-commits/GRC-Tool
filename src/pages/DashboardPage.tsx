import { useAppState } from '@/app/AppStateContext';
import { PageHeader } from '@/components/PageHeader';

export const DashboardPage = () => {
  const { state } = useAppState();

  const compliant = state.controls.filter((c) => c.status === 'compliant').length;
  const nonCompliant = state.controls.filter((c) => c.status === 'non_compliant').length;

  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Single-user compliance operations overview"
      />
      <div className="grid grid-4">
        <div className="card"><strong>Frameworks</strong><div>{state.frameworks.length}</div></div>
        <div className="card"><strong>Open Risks</strong><div>{state.risks.filter((r) => r.status !== 'closed').length}</div></div>
        <div className="card"><strong>Open Findings</strong><div>{state.findings.filter((f) => f.status !== 'closed').length}</div></div>
        <div className="card"><strong>Upcoming Audits</strong><div>{state.audits.filter((a) => a.status === 'planned').length}</div></div>
      </div>
      <div className="grid" style={{ marginTop: 12 }}>
        <div className="card">
          <h3>Compliance Summary</h3>
          <p>Compliant controls: {compliant}</p>
          <p>Non-compliant controls: {nonCompliant}</p>
          <p>Partially compliant controls: {state.controls.filter((c) => c.status === 'partially_compliant').length}</p>
        </div>
        <div className="card">
          <h3>Recent Activity (sample)</h3>
          <ul>
            <li>Risk register updated</li>
            <li>Evidence item approved</li>
            <li>Internal audit planned</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
