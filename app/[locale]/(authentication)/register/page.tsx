import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { RegisterForm } from '@/components/forms/registerform';

export default function RegisterPage() {
  const t = useTranslations('RegisterPage');
  return (
    <div className='w-full'>
      <h1 className='mb-4 text-center text-xl font-semibold'>{t('title')}</h1>
      <RegisterForm />

      <p className='mt-4 text-center text-sm text-gray-600'>
        If you already have an account, please&nbsp;
        <Link href='/login' className='text-blue-500'>
          Sign in
        </Link>
      </p>
    </div>
  );
}
