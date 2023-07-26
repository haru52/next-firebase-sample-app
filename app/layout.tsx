import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Alert from '@/components/alert';
import ClientParent from '@/components/client-parent';
import Header from '@/components/header';
import StateProvider from '@/components/state-provider';
import MetaTitleGenerator from '@/lib/usecases/meta-title-generator';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: MetaTitleGenerator.run(),
  description: 'Next.js on Firebase sample Web application.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StateProvider>
      <ClientParent>
        <html lang="en" data-bs-theme="dark">
          <body className={inter.className}>
            <Header />
            <main className="container">
              <Alert />
              {children}
            </main>
          </body>
        </html>
      </ClientParent>
    </StateProvider>
  );
}
