"use client";

import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Context } from '../../components/Clients';
import { redirect } from 'next/navigation'
import { toast } from 'react-hot-toast';

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context)

  const validate = () => {
    if (!name) return toast.error("Please enter name");
    if (!email) return toast.error("Please enter email");
    if (!password) return toast.error("Please enter password");
    return;
  }

  const registerHandler = async (e) => {
    const details = {
      name: name,
      email: email,
      password: password
    }
    // validate();
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      })

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user)
      toast.success(data.message);
    } catch (error) {
      return toast.error(error)
    }
  }

  if (user._id) return redirect("/");

  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input
            type="text"
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>

          <p>OR</p>
          <Link href={"/login"}>Log IN</Link>
        </form>
      </section>
    </div>
  )
}

export default Page