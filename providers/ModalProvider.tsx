'use client';

import { CreateLaboModal } from '@/components/modals/create-lab';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // we see if the component is mounted to avoid SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <CreateLaboModal />;
};
