import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientParent from '@/components/client-parent';
import Header from '@/components/header';
import StateProvider from '@/components/state-provider';
import MetaTitleGenerator from '@/lib/usecases/meta-title-generator';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: MetaTitleGenerator.run(),
  description: 'Next.js on Firebase sample Web application.',
};

config.autoAddCss = false;

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
            <main className="container">{children}</main>
          </body>
        </html>
      </ClientParent>
    </StateProvider>
  );
}
