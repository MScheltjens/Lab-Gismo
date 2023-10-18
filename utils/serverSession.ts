import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

export const getAuthServerSession = async () => await getServerSession(authOptions);
