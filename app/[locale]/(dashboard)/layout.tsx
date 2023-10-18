import { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-1 flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
