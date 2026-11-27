import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      // `auth` is inferred as Session | null
      // `request` is inferred as NextAuthRequest (extends NextRequest)
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (pathname.startsWith('/dashboard')) {
        return isLoggedIn;
      }

      return true;
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
