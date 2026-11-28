import NextAuth, { DefaultSession, type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (!user.email) return false;

        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name ?? '',
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        const guest = await getGuest(session.user.email);
        session.user.guestId = guest?.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      guestId?: string | number; // match your actual guest.id type
    } & DefaultSession['user'];
  }
}
