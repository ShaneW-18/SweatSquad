import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Logout() {
  useEffect(() => {
    try {
      signOut({
        callbackUrl: "/login",
      });
    } catch (e) {}
  });

  return <></>;
}
