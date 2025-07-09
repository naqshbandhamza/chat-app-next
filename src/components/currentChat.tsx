'use client';
import Link from 'next/link'
import Image from 'next/image';
import { Roboto, Inter, Montserrat } from 'next/font/google'
import { User } from '@/types/User';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';


const inter = Montserrat({
    weight: '400',
    subsets: ['latin'],
})

function ChatInput() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaContainerRef = useRef<HTMLDivElement>(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        const divtext = textareaContainerRef.current;
        if (textarea && divtext) {
            textarea.style.height = 'auto'; // Reset height
            divtext.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`; // Max height = 300px
            divtext.style.height = `${Math.min(textarea.scrollHeight + 20, 340)}px`; // Max height = 340px
        }
    };

    return (
        <div className="absolute bottom-0 left-0 w-full min-h-[110px] bg-[#F1F1F1]"
            ref={textareaContainerRef}
        >
            <textarea
                ref={textareaRef}
                onInput={handleInput}
                placeholder="Type your message here..."
                className="absolute w-[85%] min-h-[60px] max-h-[300px] overflow-y-auto border border-solid border-[#E6E6E6] right-[20px] top-[10px] rounded-[24px] p-[20px] resize-none"
            >
            </textarea>
            <button className='w-10 h-10 rounded-[50%]  absolute bottom-[25px] right-[35px]' onClick={() => alert("message sent")}>
                <Image src="/icons/send.svg" alt="Send" width={20} height={20} className='m-auto' />
            </button>
        </div>
    );
}

export default function MainChat() {

    console.log("Main Chat Rendered")

    const userid: any = useSelector((state: any) => state.user.id);
    const token: any = useSelector((state: any) => state.user.token);

    console.log(userid, token);

    return (
        <div className='h-[90%] w-[100%] text-gray-900 relative bg-[#ECECFF]'>
            <ChatInput />
        </div>
    )
}