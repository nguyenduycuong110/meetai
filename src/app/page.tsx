'use client';

import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@base-ui/react";


export default function Home() {
  const { data: session, } = authClient.useSession() 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError: (error) => {
        window.alert("Something went wrong");
      },
      OnSuccess: () => {
        window.alert("Success");
      }
    })
  }

   const onLogin = async () => {
    authClient.signIn.email({
      email,
      password,
    },{
      onError: (error) => {
        window.alert("Something went wrong");
      },
      OnSuccess: () => {
        window.alert("Success");
      }
    })
  }

  if(session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <p>Login in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-4">
        <Input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <Input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          placeholder="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <Input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          placeholder="Password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
