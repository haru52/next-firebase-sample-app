import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page - Next.js Firebase App',
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
