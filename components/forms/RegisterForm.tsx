'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { RegisterFormSchema, TRegisterFormSchema } from '@/lib/schemas/authenticationFormSchemas';
import { registerUser } from '@/serverActions/authentication';

import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Icons } from '../ui/icons';
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';

export const RegisterForm = () => {
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });
  const router = useRouter();
  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const registerAction = async (formData: FormData) => {
    const result = RegisterFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
      let errorMessage = '';
      result.error.errors.forEach((error) => {
        errorMessage += error.message + '\n';
      });
      toast({ variant: 'destructive', title: errorMessage });
      reset();
      return;
    }
    const { error, success, user } = await registerUser(result.data);
    if (error) {
      toast({ variant: 'destructive', title: error });
      reset();
      return;
    }
    if (success) {
      toast({ variant: 'default', title: `Created new user ${user.name}` });
      router.push('/login');
    }
  };

  return (
    <Form {...form}>
      <form action={registerAction} className='w-full min-w-min space-y-4 bg-inherit'>
        <div className='space-y-3'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input {...field} type='text' placeholder='surname' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='name' />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              );
            }}
          />

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

          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='Confirm password' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button className='mt-6 w-full' type='submit'>
          <p>Sign up!</p> {isSubmitting && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
        </Button>
      </form>
    </Form>
  );
};
