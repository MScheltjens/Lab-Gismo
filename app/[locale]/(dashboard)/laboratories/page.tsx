'use client';
import { useSession } from 'next-auth/react';

// import { getAuthServerSession } from '@/utils/serverSession';

export default function LaboratoriesPage() {
  // const session = await getAuthServerSession();
  const { data: session } = useSession();

  // const { isOpen, onOpen } = useCreateLabo((state) => ({
  //   isOpen: state.isOpen,
  //   onOpen: state.onOpen,
  // }));

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);
  return (
    <main className='mt-16 flex h-screen w-screen flex-col items-center'>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
