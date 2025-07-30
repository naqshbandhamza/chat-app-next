'use client';
import Link from 'next/link'
import Image from 'next/image';
import { Roboto, Inter, Montserrat } from 'next/font/google'
import { User } from '@/types/User';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRef } from 'react';
import { Chat } from "@/types/chatTypes";
import React from 'react';
import ChatCard from './chatCard';
import { useNotifcationSocket } from '@/lib/hooks/notificationSocket';
import { appendChat } from '@/store/slices/chatSlice';

const inter = Montserrat({
    weight: '400',
    subsets: ['latin'],
})

export default function Chats() {

    const dispatch = useDispatch();

    console.log("Chats list Rendered")
    const { username, id } = useSelector((state: any) => state.user);
    const chats: Chat[] = useSelector((state: any) => state.chats.chats);

    console.log(username, chats);

    const { sendMessage } = useNotifcationSocket(username, (data) => {
        console.log(data)
        // dispatch(updateChats(data.latest_message))
        const { messages, ...rest } = data.data.chat.chat;

        let net_result = {
            ...rest, latest_message: messages[0]
        }

        dispatch(appendChat(net_result))

    });

    return (
        <div className="w-full max-w-xl mx-auto space-y-4 bg-white">
            {chats !== undefined && (
                chats.map((chat,indx) => {
                    const latest = chat.latest_message;
                    const participantUsernames = chat.participants
                        .map((p) => p.username);

                    return (
                        <ChatCard chat={chat} key={indx} id={id} username={username} latest={latest} participantUsernames={participantUsernames} />
                    );
                })
            )}
        </div>
    )
}