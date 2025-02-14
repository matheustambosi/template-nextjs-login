"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}

      <ToastContainer />
    </SessionProvider>
  );
};
