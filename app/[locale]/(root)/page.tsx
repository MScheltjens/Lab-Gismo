import { LucidePower } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export default function HomePage() {
  return (
    <main className='flex h-full flex-1 flex-col items-center justify-center'>
      <section className='space-y-12 px-10'>
        <h1 className='text-7xl font-extrabold tracking-wide text-primary drop-shadow-md md:text-9xl lg:text-9xl'>Lab Gismo</h1>
      </section>
      <Link href={`/login`} className={cn(buttonVariants(), 'mt-4 h-16 w-16 rounded-full transition-all ease-out hover:scale-110 active:scale-100')}>
        <LucidePower className='h-10 w-10' />
      </Link>
    </main>
  );
}
