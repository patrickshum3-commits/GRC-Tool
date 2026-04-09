import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { AppState, Audit, Control, Evidence, Finding, Framework, Risk } from '@/domain/types';
import { localStateStore } from '@/persistence/storage/localStateStore';
import { createId } from '@/utils/id';

interface AppStateContextValue {
  state: AppState;
  addFramework: (input: Pick<Framework, 'code' | 'name' | 'version' | 'status' | 'workspaceId'>) => void;
  addControl: (input: Pick<Control, 'code' | 'title' | 'description' | 'owner' | 'status' | 'workspaceId'>) => void;
  addRisk: (input: Pick<Risk, 'title' | 'description' | 'riskType' | 'owner' | 'likelihood' | 'impact' | 'status' | 'workspaceId' | 'treatmentPlan'>) => void;
  addAudit: (input: Pick<Audit, 'name' | 'frameworkId' | 'auditType' | 'plannedDate' | 'status' | 'workspaceId' | 'leadAuditor' | 'scope'>) => void;
  addFinding: (input: Pick<Finding, 'title' | 'findingType' | 'severity' | 'status' | 'workspaceId' | 'auditId' | 'controlId' | 'dueDate' | 'description'>) => void;
  addEvidence: (input: Pick<Evidence, 'title' | 'filePath' | 'sourceType' | 'status' | 'workspaceId' | 'version' | 'capturedAt' | 'notes'>) => void;
  reset: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

const withAudit = <T extends object>(payload: T) => ({
  ...payload,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const AppStateProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AppState>(() => localStateStore.load());

  useEffect(() => {
    localStateStore.save(state);
  }, [state]);

  const value = useMemo<AppStateContextValue>(() => ({
    state,
    addFramework: (input) => {
      setState((prev) => ({
        ...prev,
        frameworks: [...prev.frameworks, withAudit({ id: createId('fw'), ...input })]
      }));
    },
    addControl: (input) => {
      setState((prev) => ({
        ...prev,
        controls: [...prev.controls, withAudit({ id: createId('ctl'), ...input })]
      }));
    },
    addRisk: (input) => {
      setState((prev) => ({
        ...prev,
        risks: [
          ...prev.risks,
          withAudit({ id: createId('risk'), score: input.likelihood * input.impact, ...input })
        ]
      }));
    },
    addAudit: (input) => {
      setState((prev) => ({
        ...prev,
        audits: [...prev.audits, withAudit({ id: createId('audit'), ...input })]
      }));
    },
    addFinding: (input) => {
      setState((prev) => ({
        ...prev,
        findings: [...prev.findings, withAudit({ id: createId('finding'), ...input })]
      }));
    },
    addEvidence: (input) => {
      setState((prev) => ({
        ...prev,
        evidence: [...prev.evidence, withAudit({ id: createId('evd'), ...input })]
      }));
    },
    reset: () => {
      setState(localStateStore.reset());
    }
  }), [state]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = (): AppStateContextValue => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return context;
};
