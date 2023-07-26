import type { Metadata } from 'next';
import MetaTitleGenerator from '@/lib/usecases/meta-title-generator';

export const metadata: Metadata = {
  title: MetaTitleGenerator.run('Terms of Service'),
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
