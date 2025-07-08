export const dynamic = 'force-dynamic';
import { decrypt } from '@/lib/session' // Your custom encryption function
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileHeader from '@/components/layout/profileHeader';
import { User } from '@/types/User';
import { Providers } from '@/app/providers';

const inter = Montserrat({
  weight: '400',
  subsets: ['latin'],
});


export default async function DashboardPage() {
  console.log('profile page rendered')
  const cookieStore = await cookies();
  const session: string | undefined = cookieStore.get('session')?.value;
  const dc = session !== undefined ? await decrypt(session) : undefined;
  const decrypted = dc !== undefined ? JSON.parse(dc) : undefined;
  const token = decrypted?.token;
  if (!token) {
    redirect('/sign-in');
  }
  const username = decrypted?.username;
  const id = decrypted?.user_id;

  const user: User = { token, username, id };


  return (
    <Providers user={user}>
      <div>
        <ProfileHeader />
      </div>
    </Providers>
  );
}