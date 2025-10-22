'use server';

import { JSX } from 'react';
import { Main } from '@/components/pages/login';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

const Login = async (): Promise<JSX.Element> => {
  const cookieStore = await cookies();
  const user = cookieStore.get('user');

  if (user) redirect('/', RedirectType.replace);
  return <Main />;
};

export default Login;
