import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LoginForm } from '@/components/forms/loginform';

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  return (
    <div className='space-y-2'>
      <h1 className='text-center text-xl font-semibold'>{t('title')}</h1>
      <LoginForm />

      <p className='mt-4 text-center text-sm text-gray-600'>
        If you don&apos;t have an account, please&nbsp;
        <Link href='/register' className='text-blue-500'>
          Sign up
        </Link>
      </p>
    </div>
  );
}
