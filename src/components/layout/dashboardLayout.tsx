import Link from 'next/link'
import { Roboto, Inter, Montserrat } from 'next/font/google'
import ProfileHeader from '@/components/layout/profileHeader';


export default function DashboardLayout() {

  console.log("dashboard layout rendered 101")
  return (
    <div className="min-h-screen">
        <ProfileHeader />
    </div>
  )
}