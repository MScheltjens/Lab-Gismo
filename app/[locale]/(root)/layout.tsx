import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import { ReactNode } from 'react';

// import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '@/providers/providers';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en', 'fr', 'nl', 'de'];

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metaData: Metadata = {
  title: 'Lab Gismo',
  description: 'Lab Gismo',
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) {
    return notFound();
  }

  // needed if we want to pas all the messages to the client side thrue the next-intl client provider (try to avoid at first hand)
  // let messages;
  // try {
  //   messages = (await import(`../../messages/${locale}.json`)).default;
  // } catch (error) {
  //   notFound();
  // }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} h-screen w-screen`}>
        <Providers themeProviderProps={{ attribute: 'class', defaultTheme: 'system', enableSystem: true, disableTransitionOnChange: true }}>
          {/* <NextIntlClientProvider locale={locale}> */}
          <div className='absolute left-0 top-0 -z-50 h-full w-full rounded-md bg-gradient-to-bl from-blue-600 to-yellow-600 opacity-50 blur-3xl filter' />

          {children}
          {/* </NextIntlClientProvider> */}
        </Providers>
      </body>
    </html>
  );
}
