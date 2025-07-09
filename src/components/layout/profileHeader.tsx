'use client';
import Link from 'next/link'
import { Roboto, Inter, Montserrat } from 'next/font/google'
import { User } from '@/types/User';
import { useSelector, useDispatch } from 'react-redux';


const inter = Montserrat({
    weight: '400',
    subsets: ['latin'],
})


export default function ProfileHeader({ variation }: { variation: string }) {

    if (variation === "source")
        console.log("profile header logged in user rendered")
    else if (variation === "destination")
        console.log("profile header destination user rendered")

    const { username } = useSelector((state: any) => {
        return variation === "source" ? state.user : state.targetUser
    });

    return (
        <div className={`relative w-full h-[10%] bg-[#F1F1F1] text-gray-800 text-[14px] overflow-hidden border-b border-b-solid border-b-[#E6E6E6] ${inter.className}`}>
            {username !== null && (
                <div className='flex mt-[18px] ml-[16px] relative'>
                    <img src={'/avatar.webp'} className='w-12 h-12 rounded-[50%] object-cover' />
                    <p className='text-gray-800 text-[18px] inline-block font-bold mt-[4px] ml-[5px]'> {username}</p>
                    <div className='text-gray-800 text-[12px] inline-block absolute bottom-[0px] left-[71px]'> <div className='w-[10px] h-[10px] rounded-[50%] bg-[#68d391] absolute bottom-[3px] left-[-16px]'></div> online</div>
                </div>)}
        </div>
    )
}