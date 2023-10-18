'use client';

import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { cn } from '@/utils/cn';
import { signOut, useSession } from 'next-auth/react';
import { toast } from './use-toast';
import Link from 'next/link';
import { ToastAction } from './toast';
import { generateInitials } from '@/utils/generateInitials';

export const UserMenu = () => {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(buttonVariants({ variant: 'ghost', className: 'rounded-full p-0 transition-all ease-in-out hover:scale-125 hover:cursor-pointer' }))}>
        <Avatar>
          <AvatarImage src='' alt='Shad' />
          <AvatarFallback>{generateInitials(session.user.name ?? '')}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className=''>
          <DropdownMenuItem>
            <Link href={`/${session.user.id}/profile`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {session.user.github && (
          <DropdownMenuItem>
            <Link href={session.user.github} target='_blank'>
              Github
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => {
            toast({
              variant: 'default',
              title: 'Log Out',
              description: 'Are you sure you want to log out?',
              action: (
                <div className='flex flex-col gap-2'>
                  <ToastAction altText='Yes please.' onClick={() => signOut({ callbackUrl: '/' })}>
                    Yes please!
                  </ToastAction>
                  <ToastAction altText='No, keep me logged in' className='h-fit'>
                    No, keep me logged in
                  </ToastAction>
                </div>
              ),
            });
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
