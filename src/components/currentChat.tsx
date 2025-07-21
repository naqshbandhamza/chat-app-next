'use client';
import Link from 'next/link'
import Image from 'next/image';
import { Roboto, Inter, Montserrat } from 'next/font/google'
import { User } from '@/types/User';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';
import { Message } from '@/types/chatTypes';
import { ToastContainer, toast } from 'react-toastify';
import { useChatSocket } from '@/lib/hooks/socket';
import { useReadStatusSocket } from '@/lib/hooks/readSocket';
import { updateChatsReadStatus } from '@/store/slices/chatSlice';
import { UseDispatch } from 'react-redux';

const inter = Montserrat({
    weight: '400',
    subsets: ['latin'],
})

function ChatInput({ id, chatid, username, MessageSentSuccessfully }: { id: number, chatid: number, username: string, MessageSentSuccessfully: any }) {

    const notify = (msg: string) => toast(msg);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaContainerRef = useRef<HTMLDivElement>(null);

    const { sendMessage } = useChatSocket(chatid.toString(), (data) => {
        console.log(data)
        MessageSentSuccessfully(data.latest_message)
    });

    // console.log(chatid)

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

    const handleMessageSend = async () => {
        const content = textareaRef?.current?.value;

        if (content !== undefined)
            sendMessage(content, username, id.toString(), chatid.toString())

        // if (content?.trim() === "") {
        //     notify("message cannot be empty")
        //     return;
        // }

        // const tosend = { "sender": id, "chat": chatid, content };


        // try {
        //     const res = await fetch('/api/send-message', {
        //         method: 'POST',
        //         credentials: 'include',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(tosend),
        //     });

        //     const response = await res.json();

        //     if (response.success) {
        //         MessageSentSuccessfully(response.data)
        //     }

        // } catch (err: any) {
        // } finally {
        // }


    }

    return (
        <div className="absolute bottom-0 left-0 w-full min-h-[110px] bg-[#F1F1F1]"
            ref={textareaContainerRef}
        >
            {chatid !== null && !Number.isNaN(chatid) && (
                <>
                    <textarea
                        ref={textareaRef}
                        onInput={handleInput}
                        placeholder="Type your message here..."
                        className="absolute w-[85%] min-h-[60px] max-h-[300px] overflow-y-auto border border-solid border-[#E6E6E6] right-[20px] top-[10px] rounded-[24px] p-[20px] resize-none"
                    >
                    </textarea>
                    <button className='w-10 h-10 rounded-[50%]  absolute bottom-[25px] right-[35px]' onClick={() => {
                        handleMessageSend();
                    }}>
                        <Image src="/icons/send.svg" alt="Send" width={20} height={20} className='m-auto' />
                    </button>
                </>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default function MainChat() {

    console.log("Main Chat Rendered")
    const chatid: string = useSelector((state: any) => state.selectedChat.id);
    const { username, id } = useSelector((state: any) => state.user);

    const dispatch = useDispatch();
    const [messages, setMessages] = React.useState<Message[]>([]);

    const { sendChatReadStatus } = useReadStatusSocket(chatid !== null ? chatid.toString() : "", (data) => {
        console.log(data)
        if (data.status === "success") {
            console.log('sending dispatch')
            dispatch(updateChatsReadStatus({ user_id: id, chat_id: chatid !== null ? chatid : "" }))
        }

    });


    const getChatDetails = async (chatId: string) => {
        try {
            const res = await fetch('/api/chatdetails', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId }),
            });

            const response = await res.json();
            console.log(response)
            setMessages(response.data.messages)

        } catch (err: any) {
            alert('could not fetch chat details due to some problem')
        } finally {
        }
    }

    React.useEffect(() => {
        // console.log(chatid)
        if (chatid !== null) {
            getChatDetails(chatid)
        }
    }, [chatid])

    const MessageSentSuccessfully = (data: Message) => {
        console.log(data)
        setMessages((prev) => [...prev, data])
        if (data.sender_username !== username)
            sendChatReadStatus(chatid, id)
    }

    return (
        <div className='h-[90%] w-[100%] text-gray-900 relative bg-[#ECECFF]'>
            <div className="w-full px-4 py-6 rounded-lg h-[80vh] overflow-y-auto space-y-4 pb-[80px]">
                {messages.map((msg: any) => {
                    const isOwn = msg.sender_username === username;
                    return (
                        <div
                            key={msg.message_id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`rounded-2xl px-4 py-3 max-w-[75%] text-sm ${isOwn
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                <div className="font-semibold text-xs mb-1">
                                    {msg.sender_username}
                                </div>
                                <div>{msg.content}</div>
                                <div className="text-[10px] mt-1 text-right text-gray-300">
                                    {/* {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatInput id={id} chatid={parseInt(chatid)} username={username} MessageSentSuccessfully={MessageSentSuccessfully} />
        </div>
    )
}