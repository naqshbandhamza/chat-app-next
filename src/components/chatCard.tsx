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
import { updateChatsReadStatus, updateChats } from '@/store/slices/chatSlice';
import React from 'react';
import { useChatSocket } from '@/lib/hooks/socket';

const inter = Montserrat({
    weight: '400',
    subsets: ['latin'],
})

export default function ChatCard({ chat, username, id, latest, participantUsernames }: { chat: any, username: any, id: any, latest: any, participantUsernames: any }) {

    const dispatch = useDispatch();

    const { sendMessage } = useChatSocket(chat.chat_id.toString(), (data) => {
        console.log(data)
        dispatch(updateChats(data.latest_message))
    });

    return (
        <>
            {chat !== undefined && (
                <div
                    key={chat.chat_id}
                    className="p-4 bg-white border-b border-gray-100 m-0"
                    onClick={() => {
                        if (!chat.latest_message?.read_by.includes(id))
                            dispatch(updateChatsReadStatus({ user_id: id, chat_id: chat.chat_id }))
                        dispatch(setChatId(chat.chat_id.toString()))
                        let target_username = participantUsernames.includes(username) ? chat.creator_username : participantUsernames[0]
                        dispatch(setTargetUser({ username: target_username, id: null, token: null }));

                        let ele = document.getElementById("left-bar");
                        let ele1 = document.getElementById("right-bar");
                        if(ele && ele1){
                            ele.style.zIndex='1';
                            ele1.style.zIndex='2';
                        }
                    }}
                >
                    <div className="font-semibold text-lg text-gray-800 truncate">
                        {participantUsernames.includes(username) ? chat.creator_username : participantUsernames[0]}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 truncate">
                        {latest?.content || "No messages yet"}
                        {latest?.read_by && !latest.read_by.includes(id) && (
                            <span style={{ display: "inline-block", width: "auto", padding: "5px", backgroundColor: "#95FF95", color: "#00cc66", borderRadius: "4px",fontWeight:"bold" }}>unread</span>
                        )}
                    </div>

                </div>
            )}
        </>
    )
}