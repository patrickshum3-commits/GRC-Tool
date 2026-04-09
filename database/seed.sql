INSERT INTO workspaces (id, name, description, created_at, updated_at)
VALUES ('ws_default', 'Default Workspace', 'Single-user consultant workspace', datetime('now'), datetime('now'));

INSERT INTO frameworks (id, workspace_id, code, name, version, status, created_at, updated_at) VALUES
('fw_iso27001', 'ws_default', 'ISO27001', 'ISO/IEC 27001', '2022', 'active', datetime('now'), datetime('now')),
('fw_iso27701', 'ws_default', 'ISO27701', 'ISO/IEC 27701', '2019', 'active', datetime('now'), datetime('now')),
('fw_pcidss', 'ws_default', 'PCI-DSS', 'PCI DSS', '4.0.1', 'active', datetime('now'), datetime('now'));

INSERT INTO controls (id, workspace_id, code, title, description, status, owner, created_at, updated_at) VALUES
('ctl_access_review', 'ws_default', 'CTRL-001', 'Access Review', 'Periodic review of user access rights.', 'partially_compliant', 'Security Lead', datetime('now'), datetime('now')),
('ctl_log_monitoring', 'ws_default', 'CTRL-002', 'Log Monitoring', 'Centralized logging and monitoring controls.', 'non_compliant', 'IT Ops', datetime('now'), datetime('now')),
('ctl_data_retention', 'ws_default', 'CTRL-003', 'Data Retention Policy', 'Retention schedule for personal and payment data.', 'compliant', 'Privacy Officer', datetime('now'), datetime('now'));

INSERT INTO control_framework_mappings (id, control_id, framework_id, requirement_id, created_at) VALUES
('map_1', 'ctl_access_review', 'fw_iso27001', NULL, datetime('now')),
('map_2', 'ctl_access_review', 'fw_pcidss', NULL, datetime('now')),
('map_3', 'ctl_data_retention', 'fw_iso27701', NULL, datetime('now'));

INSERT INTO risks (id, workspace_id, title, description, risk_type, owner, likelihood, impact, score, treatment_plan, status, created_at, updated_at) VALUES
('risk_1', 'ws_default', 'Over-privileged accounts', 'Excessive permissions may allow unauthorized actions.', 'information_security', 'Security Lead', 4, 4, 16, 'Quarterly review and role-based cleanup.', 'open', datetime('now'), datetime('now')),
('risk_2', 'ws_default', 'Unclear privacy retention periods', 'Personal data kept longer than required.', 'privacy', 'Privacy Officer', 3, 3, 9, 'Publish retention standard and automate deletion where possible.', 'in_treatment', datetime('now'), datetime('now')),
('risk_3', 'ws_default', 'Cardholder data exposure', 'Insecure storage of payment account information.', 'payment_security', 'Compliance Manager', 2, 5, 10, 'Encrypt storage and tighten key management.', 'open', datetime('now'), datetime('now'));
