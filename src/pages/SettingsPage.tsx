import { useAppState } from '@/app/AppStateContext';
import { PageHeader } from '@/components/PageHeader';

export const SettingsPage = () => {
  const { reset } = useAppState();

  return (
    <section>
      <PageHeader title="Settings" subtitle="Local workspace preferences and maintenance" />
      <div className="card">
        <h3>Data management</h3>
        <p>Reset local MVP data to seeded defaults.</p>
        <button onClick={reset}>Reset local data</button>
      </div>
    </section>
  );
};
