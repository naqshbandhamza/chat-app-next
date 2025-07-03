export const dynamic = 'force-dynamic';

import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';

const inter = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const ud = cookieStore.get('user_data')?.value;
  let user_data =   ud ? JSON.parse(ud) : null;
  let user_data1 =   user_data ? JSON.parse(user_data) : null;

  if (!token) {
    return <p>Not authenticated</p>;
  }

  return <p>welcome here {user_data1.username}</p>;
}