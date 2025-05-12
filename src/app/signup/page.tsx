"use client"; //using this line we can say this is a client component and everything inside api folder is always server  component
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled , setbuttonDisabled] = useState(false);
  const [loading , setLoading] = useState(false);

  const onSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup" , user);
        console.log('signup success' , response.data);
        router.push("/login");
      } 
      catch (error: any) {
        console.log("Signup falied" , error.message)
        toast.error(error.message)
      }
      finally{

      }
  };

  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setbuttonDisabled(false);
    }
    else{
      setbuttonDisabled(true);
    }
  } , [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-2xl text-white">{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
      <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-black hover:text-white">{buttonDisabled ? "you can't Signup" : "Signup"}</button>
      <Link href={'/login'}>Visit login page</Link>
    </div>
  );
}
