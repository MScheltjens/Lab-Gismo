import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

import { authOptions } from '@/lib/auth';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/dashboard');
  }
  return (
    <div className='flex h-screen flex-1 items-center justify-center drop-shadow-2xl'>
      <section className='min-w-[320px] rounded-sm bg-secondary p-4 drop-shadow-2xl sm:w-auto'>{children}</section>
    </div>
  );
}
