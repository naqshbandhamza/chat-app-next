import Image from "next/image";
import HomeNavbar from "@/components/layout/homeNavbar";
import { Roboto,Inter,Montserrat } from 'next/font/google'
 
const inter = Montserrat({
  weight: '400',
  subsets: ['latin'],
})


export default function SignIn() {
  return (
    <div className={`relative h-screen w-full bg-[#FFFFFF] overflow-hidden ${inter.className}`}
    style={{background: "linear-gradient(90deg, #3B41C5 0%, #A981BB 49%, #FFC8A9 100%)"}}
    >
      <HomeNavbar/>
      <h1 className={`text-white text-center mt-[20px] mb-[60px] font-bold text-3xl`}>Sign In to Our Chat App</h1>
      <div className="w-[420px] h-auto shadow-md mx-auto mt-[20px] text-gray-900 rounded-3xl overflow-hidden bg-[#ffffff]">
        <input className="input-field mt-[40px]" type="text" name="username" placeholder="Username" />
        <input className="input-field" type="password" name="password" placeholder="Password" />
        <button className={`submit-btn bg-[#3B41C5] border-none`}>Sign In</button>
      </div>
    </div>
  );
}
