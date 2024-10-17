import NextAuth, { NextAuthConfig, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { compare, hashSync } from "bcrypt";
import prisma from "./db";
import { getUserFromDb } from "./actions/user.actions";
import { nanoid } from "nanoid";

const authConfig: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const { email, password } = credentials;

				const res = await getUserFromDb(email as string, password as string);

				if (res.success) {
					return res.data as User;
				}

				return null;
			},
		}),
	],
	trustHost: true,
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.provider === "credentials") {
				token.credentials = true;
			}
			return token;
		},
	},
	jwt: {
		encode: async function (params) {
			if (params.token?.credentials) {
				const sessionToken = nanoid();

				if (!params.token?.sub) {
					throw new Error("No user ID found in token");
				}

				const createdSession = await prisma.session.create({
					data: {
						sessionToken: sessionToken,
						userId: params.token.sub,
						expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
					},
				});

				if (!createdSession) {
					throw new Error("Failed to create session");
				}

				return sessionToken;
			}
			return defaultEncode(params);
		},
	},
	pages: {
		signIn: "/signin",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
