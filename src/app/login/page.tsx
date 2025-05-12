"use client"; //using this line we can say this is a client component and everything inside api folder is always server  component
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled , setbuttonDisabled] = useState(false);
  const [loading , setLoading] = useState(false);

  const onLogin = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login" , user);
        console.log("login Success" , response.data);
        toast.success("login Success");
        router.push('/profile');
      } 
      catch (error: any) {
        console.log("login failed", error.message);
        toast.error(error.message);
      }
      finally{
        setLoading(false);
      }
  };  

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setbuttonDisabled(false);
    }
    else{
      setbuttonDisabled(true);
    }
  } , [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl text-white">Login</h1>
      <hr />
      <hr />
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        name="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <hr />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        name="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        autoComplete="current-password"
      />
      <hr />
      <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-black hover:text-white">Login here</button>
      <Link href={'/signup'}>Visit SignUp page</Link>
    </div>
  );
}
