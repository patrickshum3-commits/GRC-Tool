import { FormEvent, useState } from 'react';
import { useAppState } from '@/app/AppStateContext';
import { PageHeader } from '@/components/PageHeader';

export const AuditsPage = () => {
  const { state, addAudit, addFinding } = useAppState();
  const [name, setName] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name) return;
    addAudit({
      workspaceId: state.workspaces[0].id,
      name,
      frameworkId: state.frameworks[0]?.id,
      auditType: 'internal_iso',
      plannedDate: new Date().toISOString().slice(0, 10),
      status: 'planned',
      leadAuditor: 'Consultant',
      scope: 'MVP scope'
    });
    setName('');
  };

  return (
    <section>
      <PageHeader title="Audits" subtitle="Plan audits and register findings">
        <button
          onClick={() =>
            addFinding({
              workspaceId: state.workspaces[0].id,
              title: 'Sample PCI gap',
              findingType: 'pci_gap',
              severity: 'medium',
              status: 'open',
              description: 'Created from audit module'
            })
          }
        >
          Add Sample Finding
        </button>
      </PageHeader>
      <form className="card" onSubmit={onSubmit} style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Audit name" />
          <button type="submit">Create Audit</button>
        </div>
      </form>
      <table>
        <thead><tr><th>Name</th><th>Type</th><th>Planned Date</th><th>Status</th></tr></thead>
        <tbody>
          {state.audits.map((audit) => (
            <tr key={audit.id}>
              <td>{audit.name}</td><td>{audit.auditType}</td><td>{audit.plannedDate}</td><td>{audit.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Findings / CAPA</h3>
        <table>
          <thead><tr><th>Title</th><th>Type</th><th>Severity</th><th>Status</th></tr></thead>
          <tbody>
            {state.findings.map((finding) => (
              <tr key={finding.id}>
                <td>{finding.title}</td><td>{finding.findingType}</td><td>{finding.severity}</td><td>{finding.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
