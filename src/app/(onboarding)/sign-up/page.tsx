import Image from "next/image";
import HomeNavbar from "@/components/layout/homeNavbar";

export default function SignUp() {
  return (
    <div className="relative h-screen w-full bg-[#FFFFFF] overflow-hidden"
    style={{background: "linear-gradient(90deg, #3B41C5 0%, #A981BB 49%, #FFC8A9 100%)"}}
    >
      <HomeNavbar/>
      <h1 className="text-gray-700 text-center mt-[120px] mb-[60px] font-bold text-3xl">Sign Up to Our Chat App</h1>
      <div className="w-[420px] h-auto shadow-md mx-auto mt-[20px] text-gray-900  rounded overflow-hidden">
        <input className="input-field mt-[40px]" type="text" name="name" placeholder="Full Name" />
        <input className="input-field" type="text" name="username" placeholder="Username" />
        <input className="input-field" type="email" name="email" placeholder="email@email.com" />
        <input className="input-field" type="password" name="password" placeholder="Password" />
        <input className="input-field" type="password" name="confirm-password" placeholder="Confirm Password" />
        <button className="submit-btn">Sign Up</button>
      </div>
    </div>
  );
}
