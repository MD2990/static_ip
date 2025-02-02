import "./globals.css";
import React from "react";
import AuthProvider from "./AuthProvider";
import { Provider } from "@components/ui/provider";
import LogOut from "./LogOut";
import { MyMiniIcon } from "@lib/MyIcons";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<AuthProvider>
					<Provider>
						<LogOut />
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
