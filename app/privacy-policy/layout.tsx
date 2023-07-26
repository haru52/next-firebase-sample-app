import type { Metadata } from 'next';
import MetaTitleGenerator from '@/lib/usecases/meta-title-generator';

export const metadata: Metadata = {
  title: MetaTitleGenerator.run('Privacy Policy'),
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
