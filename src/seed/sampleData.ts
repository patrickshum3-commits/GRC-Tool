import { AppState } from '@/domain/types';

const now = new Date().toISOString();

export const sampleState: AppState = {
  workspaces: [
    {
      id: 'ws_default',
      name: 'Default Workspace',
      description: 'Consultant-focused offline workspace',
      createdAt: now,
      updatedAt: now
    }
  ],
  frameworks: [
    {
      id: 'fw_iso27001',
      workspaceId: 'ws_default',
      code: 'ISO27001',
      name: 'ISO/IEC 27001',
      version: '2022',
      status: 'active',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'fw_iso27701',
      workspaceId: 'ws_default',
      code: 'ISO27701',
      name: 'ISO/IEC 27701',
      version: '2019',
      status: 'active',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'fw_pci',
      workspaceId: 'ws_default',
      code: 'PCI-DSS',
      name: 'PCI DSS',
      version: '4.0.1',
      status: 'active',
      createdAt: now,
      updatedAt: now
    }
  ],
  controls: [
    {
      id: 'ctl_1',
      workspaceId: 'ws_default',
      code: 'CTRL-001',
      title: 'Access Review',
      description: 'Perform quarterly access review.',
      owner: 'Security Lead',
      status: 'partially_compliant',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'ctl_2',
      workspaceId: 'ws_default',
      code: 'CTRL-002',
      title: 'Security Logging',
      description: 'Collect and analyze audit logs.',
      owner: 'IT Ops',
      status: 'non_compliant',
      createdAt: now,
      updatedAt: now
    }
  ],
  risks: [
    {
      id: 'risk_1',
      workspaceId: 'ws_default',
      title: 'Privilege escalation risk',
      description: 'High privileged roles are not reviewed frequently.',
      riskType: 'information_security',
      owner: 'Security Lead',
      likelihood: 4,
      impact: 4,
      score: 16,
      treatmentPlan: 'Enforce quarterly access recertification.',
      status: 'open',
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'risk_2',
      workspaceId: 'ws_default',
      title: 'Personal data retention overrun',
      description: 'Lack of documented deletion schedule.',
      riskType: 'privacy',
      owner: 'Privacy Officer',
      likelihood: 3,
      impact: 3,
      score: 9,
      treatmentPlan: 'Publish retention matrix and execute deletion tasks.',
      status: 'in_treatment',
      createdAt: now,
      updatedAt: now
    }
  ],
  audits: [
    {
      id: 'audit_1',
      workspaceId: 'ws_default',
      name: 'Q2 Internal ISO 27001 Audit',
      frameworkId: 'fw_iso27001',
      auditType: 'internal_iso',
      plannedDate: '2026-06-15',
      status: 'planned',
      leadAuditor: 'Consultant A',
      scope: 'ISMS core processes',
      createdAt: now,
      updatedAt: now
    }
  ],
  findings: [
    {
      id: 'fnd_1',
      workspaceId: 'ws_default',
      auditId: 'audit_1',
      controlId: 'ctl_2',
      title: 'Missing alert thresholds for critical logs',
      findingType: 'nonconformity',
      severity: 'high',
      status: 'open',
      dueDate: '2026-07-10',
      createdAt: now,
      updatedAt: now
    }
  ],
  evidence: [
    {
      id: 'evd_1',
      workspaceId: 'ws_default',
      title: 'Access review minutes - March 2026',
      filePath: 'evidence/access-review-mar-2026.pdf',
      sourceType: 'document',
      version: '1.0',
      capturedAt: '2026-03-30',
      status: 'approved',
      notes: 'Approved by security lead.',
      createdAt: now,
      updatedAt: now
    }
  ]
};
