import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Next.js Firebase App',
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
