PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS frameworks (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  version TEXT,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(workspace_id, code),
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS requirements (
  id TEXT PRIMARY KEY,
  framework_id TEXT NOT NULL,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(framework_id, code),
  FOREIGN KEY(framework_id) REFERENCES frameworks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS controls (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  owner TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(workspace_id, code),
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS control_framework_mappings (
  id TEXT PRIMARY KEY,
  control_id TEXT NOT NULL,
  framework_id TEXT NOT NULL,
  requirement_id TEXT,
  created_at TEXT NOT NULL,
  UNIQUE(control_id, framework_id, requirement_id),
  FOREIGN KEY(control_id) REFERENCES controls(id) ON DELETE CASCADE,
  FOREIGN KEY(framework_id) REFERENCES frameworks(id) ON DELETE CASCADE,
  FOREIGN KEY(requirement_id) REFERENCES requirements(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS risks (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  risk_type TEXT NOT NULL,
  owner TEXT,
  likelihood INTEGER NOT NULL,
  impact INTEGER NOT NULL,
  score INTEGER NOT NULL,
  treatment_plan TEXT,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS control_risk_mappings (
  id TEXT PRIMARY KEY,
  control_id TEXT NOT NULL,
  risk_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE(control_id, risk_id),
  FOREIGN KEY(control_id) REFERENCES controls(id) ON DELETE CASCADE,
  FOREIGN KEY(risk_id) REFERENCES risks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audits (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  name TEXT NOT NULL,
  framework_id TEXT,
  audit_type TEXT NOT NULL,
  planned_date TEXT,
  status TEXT NOT NULL,
  lead_auditor TEXT,
  scope TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  FOREIGN KEY(framework_id) REFERENCES frameworks(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS audit_checklist_items (
  id TEXT PRIMARY KEY,
  audit_id TEXT NOT NULL,
  control_id TEXT,
  requirement_id TEXT,
  question TEXT NOT NULL,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(audit_id) REFERENCES audits(id) ON DELETE CASCADE,
  FOREIGN KEY(control_id) REFERENCES controls(id) ON DELETE SET NULL,
  FOREIGN KEY(requirement_id) REFERENCES requirements(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS findings (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  audit_id TEXT,
  control_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  finding_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  status TEXT NOT NULL,
  due_date TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  FOREIGN KEY(audit_id) REFERENCES audits(id) ON DELETE SET NULL,
  FOREIGN KEY(control_id) REFERENCES controls(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS corrective_actions (
  id TEXT PRIMARY KEY,
  finding_id TEXT NOT NULL,
  title TEXT NOT NULL,
  action_owner TEXT,
  due_date TEXT,
  status TEXT NOT NULL,
  verification_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(finding_id) REFERENCES findings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  source_type TEXT NOT NULL,
  version TEXT,
  captured_at TEXT,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evidence_links (
  id TEXT PRIMARY KEY,
  evidence_id TEXT NOT NULL,
  control_id TEXT,
  risk_id TEXT,
  audit_id TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(evidence_id) REFERENCES evidence(id) ON DELETE CASCADE,
  FOREIGN KEY(control_id) REFERENCES controls(id) ON DELETE CASCADE,
  FOREIGN KEY(risk_id) REFERENCES risks(id) ON DELETE CASCADE,
  FOREIGN KEY(audit_id) REFERENCES audits(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS report_templates (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  name TEXT NOT NULL,
  report_type TEXT NOT NULL,
  template_body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);
