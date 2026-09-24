import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FitLogProvider } from '@/components/FitLogProvider';
import { ToastProvider } from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, focused workout library and daily plan manager.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          <div className="min-h-[calc(100vh-140px)]">{children}</div>
          <Footer />
          <ToastProvider />
        </FitLogProvider>
      </body>
    </html>
  );
}
