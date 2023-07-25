import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Next.js Firebase App',
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
