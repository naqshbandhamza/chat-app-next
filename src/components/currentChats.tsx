'use client';
import Link from 'next/link'
import Image from 'next/image';
import { Roboto, Inter, Montserrat } from 'next/font/google'
import { User } from '@/types/User';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRef } from 'react';
import { Chat } from "@/types/chatTypes";
import { setChatId } from '@/store/slices/selectedChat';
import { setTargetUser } from '@/store/slices/targetUserSlice';

const inter = Montserrat({
    weight: '400',
    subsets: ['latin'],
})

export default function Chats() {

    const dispatch = useDispatch();
    console.log("Chats list Rendered")
    const { username } = useSelector((state: any) => state.user);
    const chats: Chat[] = useSelector((state: any) => state.chats.chats);

    console.log(username, chats);

    return (
        <div className="w-full max-w-xl mx-auto space-y-4">
            {chats !== undefined && (
                chats.map((chat) => {
                    const latest = chat.latest_message;
                    const participantUsernames = chat.participants
                        .map((p) => p.username);

                    return (
                        <div
                            key={chat.chat_id}
                            className="p-4 bg-white shadow-md border border-gray-200 m-0"
                            onClick={() => {
                                dispatch(setChatId(chat.chat_id.toString()))
                                let target_username = participantUsernames.includes(username) ? chat.creator_username : participantUsernames[0]
                                dispatch(setTargetUser({ username: target_username, id: null, token: null }));
                            }}
                        >
                            <div className="font-semibold text-lg text-gray-800 truncate">
                                {participantUsernames.includes(username) ? chat.creator_username : participantUsernames[0]}
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 truncate">
                                {latest?.content || "No messages yet"}
                                {/* <span>
                                    {chat.created_at}
                                </span> */}
                            </div>

                        </div>
                    );
                })
            )}
        </div>
    )
}