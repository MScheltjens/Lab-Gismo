import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // const user = await prismadb.user.findUnique({
        //   where: {
        //     email: credentials.email,
        //   },
        // });
        // if (!user || !(await compare(credentials.password, user.hashedPassword!))) return null;
        return user;
      },
    }),
  ],
  // callbacks: {
  //   jwt: async ({ token, user, session, trigger, profile }) => {
  //     if (trigger === 'update' && session.name) {
  //       token.name = session.name;
  //       return token;
  //     }

  //     if (user && profile) {
  //       return {
  //         ...token,
  //         id: user.id,
  //         github: profile.html_url,
  //       };
  //     }
  //     await prismadb.user.update({
  //       where: {
  //         id: token.id as string,
  //       },
  //       data: {
  //         name: token.name,
  //       },
  //     });

  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     if (session) {
  //       return {
  //         ...session,
  //         user: {
  //           ...session.user,
  //           id: token.id,
  //           github: token.github,
  //         },
  //       };
  //     }
  //     return session;
  //   },
  // },

  callbacks: {
    async session({ token, session }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.picture,
          },
        };
      }
      return session;
    },
    async jwt({ token, user, trigger, session, profile }) {
      if (trigger === 'update' && session.name) {
        token.name = session.name;
        return token;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      if (profile) {
        return {
          ...token,
          githubUrl: profile.html_url,
        };
      }
      const dbUser = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, token.email),
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
};
