import { Providers } from "./providers";
import "./globals.css";
import React from "react";
import { MyMiniIcon } from "@components/Lib/MyIcons";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <MyMiniIcon />
          {children}
        </Providers>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Static IPs",
  description: "Created By Majid Ahmed",
};
