import Link from 'next/link'
import { Roboto, Inter, Montserrat } from 'next/font/google'
import ProfileHeader from '@/components/layout/profileHeader';
import MainChat from '../currentChat';
import Chats from '../currentChats';
export default function DashboardLayout() {

  console.log("dashboard layout rendered 101")
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-10 h-screen">
        <div className="col-span-3 relative bg-[#F1F1F1] border border-solid border-[#E6E6E6]">
          <ProfileHeader variation={"source"} />
          <Chats/>
        </div>
        <div className="col-span-7 relative bg-[#F1F1F1] overflow-hidden">
          <ProfileHeader variation={"destination"} />
          <MainChat />
        </div>
      </div>
    </div>
  )
}