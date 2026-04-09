import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle, children }: Props) => (
  <div className="page-header">
    <div>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
    <div>{children}</div>
  </div>
);
