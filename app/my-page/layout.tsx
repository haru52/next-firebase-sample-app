import type { Metadata } from 'next';
import MetaTitleGenerator from '@/lib/usecases/meta-title-generator';

export const metadata: Metadata = {
  title: MetaTitleGenerator.run('My Page'),
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>My Page</h1>
      {children}
    </>
  );
}
