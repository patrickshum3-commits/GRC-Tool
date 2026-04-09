import { AppState } from '@/domain/types';

const saveText = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const reportExport = {
  internalAudit(state: AppState) {
    saveText('internal-audit-report.txt', `Internal Audit Report\nAudits: ${state.audits.length}`);
  },
  riskSummary(state: AppState) {
    saveText('risk-assessment-summary.txt', `Risk Summary\nOpen risks: ${state.risks.filter((r) => r.status !== 'closed').length}`);
  },
  managementReview(state: AppState) {
    saveText('management-review-summary.txt', `Management Review\nControls: ${state.controls.length}\nFindings: ${state.findings.length}`);
  },
  statementOfApplicability(state: AppState) {
    saveText('soa-output.txt', `Statement of Applicability\nCompliant controls: ${state.controls.filter((c) => c.status === 'compliant').length}`);
  },
  pciGapSummary(state: AppState) {
    saveText('pci-gap-summary.txt', `PCI DSS Gap Assessment\nPCI related findings: ${state.findings.filter((f) => f.findingType === 'pci_gap').length}`);
  }
};
