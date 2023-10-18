import { ReactNode } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, title, description, isOpen, onClose }: Props) => {
  const onChange = (open: boolean) => {
    if (open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className='flex h-screen flex-col justify-center sm:h-auto'>
        <DialogHeader className='mt-16 text-start'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='flex flex-1'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
