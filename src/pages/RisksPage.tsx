import { FormEvent, useState } from 'react';
import { useAppState } from '@/app/AppStateContext';
import { RiskType } from '@/domain/types';
import { PageHeader } from '@/components/PageHeader';

export const RisksPage = () => {
  const { state, addRisk } = useAppState();
  const [title, setTitle] = useState('');
  const [riskType, setRiskType] = useState<RiskType>('information_security');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title) return;
    addRisk({
      workspaceId: state.workspaces[0].id,
      title,
      description: 'New risk entry',
      riskType,
      owner: 'Unassigned',
      likelihood: 3,
      impact: 3,
      status: 'open',
      treatmentPlan: 'Define treatment tasks'
    });
    setTitle('');
  };

  return (
    <section>
      <PageHeader title="Risks" subtitle="Maintain risk register with scoring" />
      <form className="card" onSubmit={onSubmit} style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Risk title" />
          <select value={riskType} onChange={(e) => setRiskType(e.target.value as RiskType)}>
            <option value="information_security">Information Security Risk</option>
            <option value="privacy">Privacy Risk</option>
            <option value="payment_security">Payment Security / PCI Risk</option>
          </select>
          <button type="submit">Add Risk</button>
        </div>
      </form>
      <table>
        <thead><tr><th>Title</th><th>Type</th><th>Owner</th><th>Score</th><th>Status</th></tr></thead>
        <tbody>
          {state.risks.map((risk) => (
            <tr key={risk.id}>
              <td>{risk.title}</td><td>{risk.riskType}</td><td>{risk.owner}</td><td>{risk.score}</td><td>{risk.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
