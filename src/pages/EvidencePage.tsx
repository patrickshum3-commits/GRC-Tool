import { FormEvent, useState } from 'react';
import { useAppState } from '@/app/AppStateContext';
import { PageHeader } from '@/components/PageHeader';

export const EvidencePage = () => {
  const { state, addEvidence } = useAppState();
  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title || !path) return;
    addEvidence({
      workspaceId: state.workspaces[0].id,
      title,
      filePath: path,
      sourceType: 'document',
      status: 'draft',
      capturedAt: new Date().toISOString().slice(0, 10),
      version: '1.0'
    });
    setTitle('');
    setPath('');
  };

  return (
    <section>
      <PageHeader title="Evidence" subtitle="Organize local files and link to compliance artifacts" />
      <form className="card" onSubmit={onSubmit} style={{ marginBottom: 12 }}>
        <div className="form-row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Evidence title" />
          <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="Local file path" />
          <button type="submit">Add Evidence</button>
        </div>
      </form>
      <table>
        <thead><tr><th>Title</th><th>Path</th><th>Version</th><th>Status</th></tr></thead>
        <tbody>
          {state.evidence.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td><td>{item.filePath}</td><td>{item.version}</td><td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
