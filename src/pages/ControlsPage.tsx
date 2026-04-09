import { FormEvent, useMemo, useState } from 'react';
import { useAppState } from '@/app/AppStateContext';
import { ComplianceStatus } from '@/domain/types';
import { PageHeader } from '@/components/PageHeader';

export const ControlsPage = () => {
  const { state, addControl } = useAppState();
  const [statusFilter, setStatusFilter] = useState<'all' | ComplianceStatus>('all');
  const [title, setTitle] = useState('');

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return state.controls;
    return state.controls.filter((control) => control.status === statusFilter);
  }, [state.controls, statusFilter]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title) return;
    addControl({
      workspaceId: state.workspaces[0].id,
      code: `CTRL-${String(state.controls.length + 1).padStart(3, '0')}`,
      title,
      description: 'New control',
      owner: 'Unassigned',
      status: 'not_applicable'
    });
    setTitle('');
  };

  return (
    <section>
      <PageHeader title="Controls" subtitle="Map controls to frameworks and track status">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | ComplianceStatus)}>
          <option value="all">All statuses</option>
          <option value="compliant">Compliant</option>
          <option value="partially_compliant">Partially Compliant</option>
          <option value="non_compliant">Non-compliant</option>
          <option value="not_applicable">Not Applicable</option>
        </select>
      </PageHeader>
      <form onSubmit={onSubmit} className="card" style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Control title" />
          <button type="submit">Add Control</button>
        </div>
      </form>
      <table>
        <thead><tr><th>Code</th><th>Title</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>
          {filtered.map((control) => (
            <tr key={control.id}>
              <td>{control.code}</td><td>{control.title}</td><td>{control.owner}</td><td>{control.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
