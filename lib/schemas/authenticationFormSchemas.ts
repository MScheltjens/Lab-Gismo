import { z } from 'zod';

export const UserAuthenticationSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export type TUserSchema = z.infer<typeof UserAuthenticationSchema>;

export const RegisterFormSchema = UserAuthenticationSchema.extend({
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, { path: ['passwordConfirm'], message: 'Passwords have to match' });

export type TRegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export const LoginFormSchema = UserAuthenticationSchema.pick({
  email: true,
  password: true,
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;
