// 'use server';

// import { getAuthServerSession } from '@/utils/serverSession';

// export const createLab= async (name: string) => {
//   try {
//     const alreadyExists = await prismadb.laboratory.findFirst({
//       where: { name },
//     });
//     if (alreadyExists) {
//       return { error: 'Labo already exists' };
//     }
//     const response = await prismadb.laboratory.create({
//       data: { name, user: { connect: { id: (await getAuthServerSession())?.user.id } } },
//     });
//     return { success: 'Labo created', response };
//   } catch (error) {
//     return { error: 'Error creating labo' };
//   }
// };
