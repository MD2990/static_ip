import { Providers } from "./providers";
import "./globals.css";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
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
