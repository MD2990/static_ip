import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
          required: true,
          autoComplete: "current-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
          required: true,
          autoComplete: "current-password",
        },
      },
      async authorize(credentials) {
        if (
          credentials.username === "admin" &&
          (credentials.password === "admin+USER=2020")
        ) {
          return {
            _id: "1",
            name: "Admin",
            is_admin: true,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.user_name) token.user_name = user.user_name;
      if (user?.is_admin) token.is_admin = user.is_admin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.user) session.user = token.user_name;
      if (token?.is_admin) session.user.is_admin = token.is_admin;
      return session;
    },
  },
  // theme: "light",

  /*   theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "red", // Hex color code
    logo: "", // Absolute URL to image
    buttonText: "red", // Hex color code
  }, */
};
