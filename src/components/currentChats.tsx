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
        <div className="w-full max-w-xl mx-auto space-y-4">
            {chats !== undefined && (
                chats.map((chat) => {
                    const latest = chat.latest_message;
                    const participantUsernames = chat.participants
                        .map((p) => p.username);

                    return (
                        <>
                            <ChatCard chat={chat} id={id} username={username} latest={latest} participantUsernames={participantUsernames} />
                            {/* <div
                            key={chat.chat_id}
                            className="p-4 bg-white shadow-md border border-gray-200 m-0"
                            onClick={() => {
                                if (!chat.latest_message?.read_by.includes(id))
                                    dispatch(updateChatsReadStatus({ user_id: id, chat_id: chat.chat_id }))
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
                                {latest?.read_by && !latest.read_by.includes(id) && (
                                    <span style={{ display: "inline-block", width: "auto", padding: "5px", backgroundColor: "black", color: "white", borderRadius: "4px" }}>unread</span>
                                )}
                            </div>

                        </div> */}
                        </>
                    );
                })
            )}
        </div>
    )
}