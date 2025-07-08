'use client';
import Link from 'next/link'
import { Roboto,Inter,Montserrat } from 'next/font/google'
import { User } from '@/types/User'; 
import { useSelector, useDispatch } from 'react-redux';


const inter = Montserrat({
  weight: '400',
  subsets: ['latin'],
})


export default function ProfileHeader() {

    console.log("profile header rendered")

    const usert:User = useSelector((state:any) => state.user);
    // const dispatch = useDispatch();

    return (
        <div className={`relative w-full h-[120px] bg-[#ffffff] text-gray-800 text-[14px] overflow-hidden ${inter.className}`} 
        style={{background: "linear-gradient(90deg, #3B41C5 0%, #A981BB 49%, #FFC8A9 100%)"}}
        >
            <div className='absolute  w-auto left-[24px] top-[44px] uppercase font-bold'>
                    <Link
                        key={'/'}
                        href={'/'}
                    >
                        LOGO
                    </Link>
            </div>
            <p className=' text-gray-800 text-[14px]'> {usert.username}</p>
        </div>
    )
}