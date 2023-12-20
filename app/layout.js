import { Providers } from "./providers";
import "./globals.css";
import React from "react";
import { MyMiniIcon } from "@components/Lib/MyIcons";
import AuthProvider from "./AuthProvider";
import LogOut from "./LogOut";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Providers>
          <LogOut />
            <MyMiniIcon />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Static IPs",
  description: "Created By Majid Ahmed",
};
