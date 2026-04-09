import { FormEvent, useState } from 'react';
import { useAppState } from '@/app/AppStateContext';
import { PageHeader } from '@/components/PageHeader';

export const FrameworksPage = () => {
  const { state, addFramework } = useAppState();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!code || !name) return;
    addFramework({
      workspaceId: state.workspaces[0].id,
      code,
      name,
      version: 'draft',
      status: 'active'
    });
    setCode('');
    setName('');
  };

  return (
    <section>
      <PageHeader title="Frameworks" subtitle="Manage ISO/IEC and PCI frameworks" />
      <form onSubmit={onSubmit} className="card" style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <button type="submit">Add Framework</button>
        </div>
      </form>
      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Version</th><th>Status</th></tr></thead>
        <tbody>
          {state.frameworks.map((item) => (
            <tr key={item.id}>
              <td>{item.code}</td><td>{item.name}</td><td>{item.version}</td><td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
