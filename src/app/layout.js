import "./globals.css";
import React from "react";
import AuthProvider from "./AuthProvider";
import { Provider } from "@components/ui/provider";
import { MyMiniIcon } from "@lib/MyIcons";
import { Roboto_Condensed } from "next/font/google";
const Roboto = Roboto_Condensed({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={Roboto.className}>
			<body suppressHydrationWarning>
				<AuthProvider>
					<Provider>
						{/* <LogOut /> */}
						<MyMiniIcon />
						{children}
					</Provider>
				</AuthProvider>
			</body>
		</html>
	);
}
export const metadata = {
	title: "Static IPs",
	description: "Created By Majid Ahmed",
};
