import Image from "next/image";
import HomeNavbar from "@/components/layout/homeNavbar";

export default function About() {
  return (
    <div>
      <HomeNavbar />
      <div className="h-screen w-full flex items-center justify-center bg-[#E0E0E0]">
        <h1 className="text-gray-700">Welcome, to the Contact Page</h1>
      </div>
    </div>
  );
}
