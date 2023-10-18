'use server';

import { hash } from 'bcrypt';

import { RegisterFormSchema } from '@/lib/schemas/authenticationFormSchemas';

export const registerUser = async (formData: unknown) => {
  const result = RegisterFormSchema.safeParse(formData);
  if (!result.success) {
    let message = '';
    result.error?.issues.forEach((error) => {
      message = message += `${error.message}\n`;
    });
    return { error: 'Invalid data' };
  }
  const newUser = {
    name: `${result.data.firstName} ${result.data.lastName}`,
    email: result.data.email,
    password: await hash(result.data.password, 10),
  };
  // const user = await prismadb.user.create({ data: newUser });
  const user = await db.insert.users.one(newUser);
  return { success: true, user };
};
