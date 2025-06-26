import Image from "next/image";

export default function SignIn() {
  return (
    <div>
      <div className="relative h-screen w-full bg-[#E0E0E0] overflow-hidden">
        <h1 className="text-gray-700 text-center mt-[120px] font-bold">Login to Our Chat App</h1>
        <div className="w-[420px] h-[300px] shadow-md mx-auto mt-[20px] text-gray-900  rounded overflow-hidden">
          <input className=" block border-1 border-black w-[180px] mx-auto mt-[40px] rounded" type="text" name="username" value={"username"} />
          <input className=" block border-1 border-black w-[180px] mx-auto mt-[10px] rounded" type="password" name="password" value={"abcd"} />
          <button className=" block border-1 border-black w-[180px] mx-auto mt-[10px] rounded bg-black text-white">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
