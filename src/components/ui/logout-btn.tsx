"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogOutBtn() {
  return <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>;
}
