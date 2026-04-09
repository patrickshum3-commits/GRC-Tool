export type ComplianceStatus =
  | 'compliant'
  | 'partially_compliant'
  | 'non_compliant'
  | 'not_applicable';

export type RiskType = 'information_security' | 'privacy' | 'payment_security';

export type FindingType =
  | 'nonconformity'
  | 'ofi'
  | 'observation'
  | 'pci_gap';

export type AuditResultStatus =
  | 'conforms'
  | 'partially_conforms'
  | 'does_not_conform'
  | 'not_applicable'
  | 'in_place'
  | 'partially_in_place'
  | 'not_in_place';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace extends BaseEntity {
  name: string;
  description?: string;
}

export interface Framework extends BaseEntity {
  workspaceId: string;
  code: string;
  name: string;
  version?: string;
  status: 'active' | 'inactive';
}

export interface Control extends BaseEntity {
  workspaceId: string;
  code: string;
  title: string;
  description?: string;
  owner?: string;
  status: ComplianceStatus;
}

export interface Risk extends BaseEntity {
  workspaceId: string;
  title: string;
  description?: string;
  riskType: RiskType;
  owner?: string;
  likelihood: number;
  impact: number;
  score: number;
  treatmentPlan?: string;
  status: 'open' | 'in_treatment' | 'closed';
}

export interface Audit extends BaseEntity {
  workspaceId: string;
  name: string;
  frameworkId?: string;
  auditType: 'internal_iso' | 'pci_gap_assessment';
  plannedDate?: string;
  status: 'planned' | 'in_progress' | 'completed';
  leadAuditor?: string;
  scope?: string;
}

export interface Finding extends BaseEntity {
  workspaceId: string;
  auditId?: string;
  controlId?: string;
  title: string;
  description?: string;
  findingType: FindingType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'closed';
  dueDate?: string;
}

export interface Evidence extends BaseEntity {
  workspaceId: string;
  title: string;
  filePath: string;
  sourceType: 'document' | 'screenshot' | 'log' | 'other';
  version?: string;
  capturedAt?: string;
  status: 'draft' | 'approved' | 'archived';
  notes?: string;
}

export interface AppState {
  workspaces: Workspace[];
  frameworks: Framework[];
  controls: Control[];
  risks: Risk[];
  audits: Audit[];
  findings: Finding[];
  evidence: Evidence[];
}
