'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { LoginFormSchema, TLoginSchema } from '@/lib/schemas/authenticationFormSchemas';

import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const loginAction = async (formData: FormData) => {
    const result = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.path[0] + ': ' + issue.message;
      });
      toast({ variant: 'destructive', title: errorMessage });
      reset();
      return;
    }

    const response = await signIn('credentials', { redirect: false, ...result.data });

    if (response?.error) {
      toast({ variant: 'destructive', title: response.error });
      reset();
      return;
    }
    if (!response?.error) {
      toast({ variant: 'default', title: `Success!` });
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Form {...form}>
        <form action={loginAction} className='w-full min-w-min space-y-8 bg-inherit'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type='email' placeholder='email' />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' placeholder='Password' />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button className='mt-6 w-full' type='submit' disabled={isSubmitting}>
            {/* Login {isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />} */}
            {isSubmitting && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            Login
          </Button>
        </form>
      </Form>

      <p className='bg-inherit px-2 pt-4 text-center text-xs uppercase text-muted-foreground'>Or continue with</p>

      <Button variant='outline' type='button' onClick={() => signIn('google', { redirect: false })} className='group relative flex w-full p-0 drop-shadow-sm'>
        <Icons.google className='absolute left-0 h-full rounded-l-sm p-2' />
        Google
      </Button>
      <Button variant='outline' type='button' onClick={() => signIn('github', { redirect: false })} className='relative flex w-full p-0 drop-shadow-sm'>
        <Icons.gitHub className='absolute left-0 h-full rounded-l-sm p-2' />
        Github
      </Button>
    </>
  );
};
