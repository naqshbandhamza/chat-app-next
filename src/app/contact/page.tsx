import Image from "next/image";
import HomeNavbar from "@/components/layout/homeNavbar";
import { Roboto,Inter,Montserrat } from 'next/font/google'
 
const inter = Montserrat({
  weight: '400',
  subsets: ['latin'],
})


export default function About() {
  return (
    <div>
      <HomeNavbar />
      <div className="h-screen w-full flex items-center justify-center bg-[#FFFFFF]"
      style={{background: "linear-gradient(90deg, #3B41C5 0%, #A981BB 49%, #FFC8A9 100%)"}}
      >
        <h1 className={`"text-gray-700 ${inter.className}`}>Welcome, to the Contact Page</h1>
      </div>
    </div>
  );
}
