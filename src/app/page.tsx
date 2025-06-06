"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { session } from "@/db/schema";
import { Session } from "inspector/promises";

export default function Home() {

  const {
    data: session
  } = authClient.useSession();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail ] = useState("");

  // Function to handle form submission
  const onsubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: (error) => {
          window.alert(
            "something went wrong " +
              (error.error ? error.error.toString() : "Unknown error")
          );
        },
        onSuccess: () => {
          window.alert("User created successfully");
        },
      }
    );
  };

  if(session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onsubmit}>Create User</Button>
    </div>
  );
}
